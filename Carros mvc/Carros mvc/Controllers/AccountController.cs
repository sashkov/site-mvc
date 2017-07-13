using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Transactions;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using Carros_mvc.Filters;
using Carros_mvc.Models;
using Carros_mvc.Core;

namespace Carros_mvc.Controllers
{
    [Authorize]
    [InitializeSimpleMembership]
    public class AccountController : Controller
    {
        //
        // GET: /Account/Login

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                UserModel um = new UserModel();
                um.GetUsersInfo(model.UserName);
                Session[User.Identity.Name] = um;
                DatabaseControl db = new DatabaseControl();
                SqlConnection sqlcon = new SqlConnection();
               SqlDataReader rd= db.GetDataFromDB(
                    String.Format("UPDATE dbo.UserProfile SET lastIP='{0}', last_connect_date='{2}' WHERE UserName='{1}'",
                        Request.UserHostAddress, um.UserName, DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss")), out sqlcon);
                rd.Read();

                return RedirectToLocal(returnUrl);
            }

            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", "Имя пользователя или пароль не верны");
            return View(model);
        }

        //
        // POST: /Account/LogOff

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            WebSecurity.Logout();
            Session[User.Identity.Name] = null;
          return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/Register

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                try
                {
                    // -----START---------------------------------
                    /*
                                        WebSecurity.CreateUserAndAccount(model.UserName, model.Password, propertyValues: new { FirstName = model.FirstName, LastName = model.LastName, Patronymic = model.Patronymic, register_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), last_connect_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") });
                                        WebSecurity.Login(model.UserName, model.Password);
                     return RedirectToAction("Index", "Home");*/

                    string confirmationToken = WebSecurity.CreateUserAndAccount(model.UserName, model.Password, propertyValues: new { FirstName = model.FirstName, LastName = model.LastName, Patronymic = model.Patronymic, register_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), last_connect_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") }, requireConfirmationToken: true);
                    string addressTo = model.UserName;
                    string subject = "Подтверждение регистрации";
                    string callbackUrl = Url.Action("ConfirmEmail", "Account", new { id = confirmationToken }, protocol: Request.Url.Scheme);
                    string mailBody = "Для завершения регистрации перейдите по ссылке: <a href=\"" +
                        callbackUrl + "\">завершить регистрацию</a>";
                    string err;
                    if (!Mail.Send2Yandex(addressTo, subject, mailBody, out err))
                    {
                        // Ошибка отправки сообщения
                    }
                    return RedirectToAction("RegisterStepTwo", "Account");
                    // -----END---------------------------------
                }
                catch (MembershipCreateUserException e)
                {
                    ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        // -----START---------------------------------
        [AllowAnonymous]
        public ActionResult RegisterStepTwo()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult ConfirmEmail(string id)
        {
            if (WebSecurity.ConfirmAccount(id))
                return RedirectToAction("RegisterEmailConfirmed");
            return RedirectToAction("RegisterEmailNotConfirmed");
        }

        [AllowAnonymous]
        public ActionResult RegisterEmailConfirmed()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult RegisterEmailNotConfirmed()
        {
            return View();
        }
        // -----END---------------------------------

        //
        // POST: /Account/Disassociate
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Disassociate(string provider, string providerUserId)
        {
            string ownerAccount = OAuthWebSecurity.GetUserName(provider, providerUserId);
            ManageMessageId? message = null;

            // Only disassociate the account if the currently logged in user is the owner
            if (ownerAccount == User.Identity.Name)
            {
                // Use a transaction to prevent the user from deleting their last login credential
                using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.Serializable }))
                {
                    bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
                    if (hasLocalAccount || OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name).Count > 1)
                    {
                        OAuthWebSecurity.DeleteAccount(provider, providerUserId);
                        scope.Complete();
                        message = ManageMessageId.RemoveLoginSuccess;
                    }
                }
            }

            return RedirectToAction("Manage", new { Message = message });
        }

        //
        // GET: /Account/Manage

        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Пароль был изменен."
                : message == ManageMessageId.SetPasswordSuccess ? "Your password has been set."
                : message == ManageMessageId.RemoveLoginSuccess ? "The external login was removed."
                : "";
            ViewBag.HasLocalPassword = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }


        public ActionResult ManageAccount(string myBasket, string myParameters)
        {
            if (HttpContext.Session != null)
            {
                UserModel um = Session[User.Identity.Name] as UserModel;
                if (um != null)
                {
                    if (myBasket != null)
                    {
                        um.IsBasket = true;
                        um.GetUserBasket(User.Identity.Name);
                        return View("ManageAccount", um);
                    }
                    if (myParameters != "")
                    {
                        um.IsParametets = true;
                        return View("ManageAccount", um);
                    }
                }
            }
            return View("ManageAccount");
        }

        [ValidateInput(false)]
        [HttpPost]
        public ActionResult ManageAdminAccount(string usrParameter, string comission, string catalogs)
        {
            AdminModel am = new AdminModel();
            am.isAdmin = (Session[User.Identity.Name] as UserModel).IsAdmin;
            if (!String.IsNullOrEmpty(usrParameter))
            {
                am.SelectedUsers = true;
                am.GetUserModels();
                return View("ManageAdminAccount", am);
            }
            if (!String.IsNullOrEmpty(comission))
            {
                am.SelectedComissions = true;
                AdminModel.GetComissions();
                return View("ManageAdminAccount", am);
            }
            if (!String.IsNullOrEmpty(catalogs))
            {
                am.SelectedCatalogs = true;
                AdminModel.GetCatalogs();
                return View("ManageAdminAccount", am);
            }
            return View("ManageAdminAccount", am);
        }

        public ActionResult LoadAdminParameters(string parameters)
        {
            AdminModel am = new AdminModel();
            if (Request.IsAuthenticated)
            {
                am.isAdmin = (Session[User.Identity.Name] as UserModel).IsAdmin;
                string postparameters = Request.Form[0];
                Singleton<Logger>.Instance.WriteMainLine("Пришел запрос: " + postparameters);
                string commandName = postparameters.Split('|')[0];
                postparameters = postparameters.Replace(commandName + "|", "");

                switch (commandName)
                {
                    case "saveUsers": // сохранение данных пользователя
                        {
                            UserModel.SaveUsersInfo(postparameters);
                            am.GetUserModels();
                            am.SelectedUsers = true;
                            break;
                        }
                    case "saveComissions":// сохранение комиссии
                        {
                            AdminModel.SaveComissions(postparameters);
                            AdminModel.GetComissions();
                            am.SelectedComissions = true;
                            break;
                        }
                }

            }
            else
            {
                Singleton<Logger>.Instance.WriteMainLine("Пришел запрос без авторизации: " + Request.Form[0]);
            }
            return View("ManageAdminAccount", am);
        }


        public ActionResult LoadUserParameters(string parameters)
        {

            UserModel um = new UserModel();
            if (Request.IsAuthenticated)
            {
                um = Session[User.Identity.Name] as UserModel;
                string postparameters = Request.Form[0];
                Singleton<Logger>.Instance.WriteMainLine("Пришел запрос: " + postparameters);
                string commandName = postparameters.Split('|')[0];
                postparameters = postparameters.Replace(commandName + "|", "");

                switch (commandName)
                {

                    case "removeFromBascet": // удаление из корзины
                        {
                            string[] hashes = postparameters.Split('|');
                            foreach (var hash in hashes)
                            {
                                if (um.DetailsList.ContainsKey(hash))
                                    um.DetailsList[hash].InBasket = false;
                            }

                            if (!UserModel.RemoveDetailFromUserBasket(um.UserName, hashes))
                            {
                                // пишем в логи и выводим ошибку
                            }
                            else
                            {
                                um.GetUserBasket(User.Identity.Name);

                            }

                            break;
                        }
                }

            }
            else
            {
                Singleton<Logger>.Instance.WriteMainLine("Пришел запрос без авторизации: " + Request.Form[0]);
            }
            return View("ManageAccount", um);
        }



        //
        // POST: /Account/Manage

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Manage(LocalPasswordModel model)
        {
            bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.HasLocalPassword = hasLocalAccount;
            ViewBag.ReturnUrl = Url.Action("Manage");
            if (hasLocalAccount)
            {
                if (ModelState.IsValid)
                {
                    // ChangePassword will throw an exception rather than return false in certain failure scenarios.
                    bool changePasswordSucceeded;
                    try
                    {
                        changePasswordSucceeded = WebSecurity.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword);
                    }
                    catch (Exception)
                    {
                        changePasswordSucceeded = false;
                    }

                    if (changePasswordSucceeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.ChangePasswordSuccess });
                    }
                    else
                    {
                        ModelState.AddModelError("", "The current password is incorrect or the new password is invalid.");
                    }
                }
            }
            else
            {
                // User does not have a local password so remove any validation errors caused by a missing
                // OldPassword field
                ModelState state = ModelState["OldPassword"];
                if (state != null)
                {
                    state.Errors.Clear();
                }

                if (ModelState.IsValid)
                {
                    try
                    {
                        WebSecurity.CreateAccount(User.Identity.Name, model.NewPassword);
                        return RedirectToAction("Manage", new { Message = ManageMessageId.SetPasswordSuccess });
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("", e);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // POST: /Account/ExternalLogin

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            return new ExternalLoginResult(provider, Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/ExternalLoginCallback

        [AllowAnonymous]
        public ActionResult ExternalLoginCallback(string returnUrl)
        {
            AuthenticationResult result = OAuthWebSecurity.VerifyAuthentication(Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
            if (!result.IsSuccessful)
            {
                return RedirectToAction("ExternalLoginFailure");
            }

            if (OAuthWebSecurity.Login(result.Provider, result.ProviderUserId, createPersistentCookie: false))
            {
                return RedirectToLocal(returnUrl);
            }

            if (User.Identity.IsAuthenticated)
            {
                // If the current user is logged in add the new account
                OAuthWebSecurity.CreateOrUpdateAccount(result.Provider, result.ProviderUserId, User.Identity.Name);
                return RedirectToLocal(returnUrl);
            }
            else
            {
                // User is new, ask for their desired membership name
                string loginData = OAuthWebSecurity.SerializeProviderUserId(result.Provider, result.ProviderUserId);
                ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(result.Provider).DisplayName;
                ViewBag.ReturnUrl = returnUrl;
                return View("ExternalLoginConfirmation", new RegisterExternalLoginModel { UserName = result.UserName, ExternalLoginData = loginData });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLoginConfirmation(RegisterExternalLoginModel model, string returnUrl)
        {
            string provider = null;
            string providerUserId = null;

            if (User.Identity.IsAuthenticated || !OAuthWebSecurity.TryDeserializeProviderUserId(model.ExternalLoginData, out provider, out providerUserId))
            {
                return RedirectToAction("Manage");
            }

            if (ModelState.IsValid)
            {
                // Insert a new user into the database
                using (UsersContext db = new UsersContext())
                {
                    UserProfile user = db.UserProfiles.FirstOrDefault(u => u.UserName.ToLower() == model.UserName.ToLower());
                    // Check if user already exists
                    if (user == null)
                    {
                        // Insert name into the profile table
                        db.UserProfiles.Add(new UserProfile { UserName = model.UserName });
                        db.SaveChanges();

                        OAuthWebSecurity.CreateOrUpdateAccount(provider, providerUserId, model.UserName);
                        OAuthWebSecurity.Login(provider, providerUserId, createPersistentCookie: false);

                        return RedirectToLocal(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError("UserName", "Пользователь уже зарегистрирован.");
                    }
                }
            }

            ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(provider).DisplayName;
            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // GET: /Account/ExternalLoginFailure

        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [AllowAnonymous]
        [ChildActionOnly]
        public ActionResult ExternalLoginsList(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return PartialView("_ExternalLoginsListPartial", OAuthWebSecurity.RegisteredClientData);
        }

        [ChildActionOnly]
        public ActionResult RemoveExternalLogins()
        {
            ICollection<OAuthAccount> accounts = OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name);
            List<ExternalLogin> externalLogins = new List<ExternalLogin>();
            foreach (OAuthAccount account in accounts)
            {
                AuthenticationClientData clientData = OAuthWebSecurity.GetOAuthClientData(account.Provider);

                externalLogins.Add(new ExternalLogin
                {
                    Provider = account.Provider,
                    ProviderDisplayName = clientData.DisplayName,
                    ProviderUserId = account.ProviderUserId,
                });
            }

            ViewBag.ShowRemoveButton = externalLogins.Count > 1 || OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            return PartialView("_RemoveExternalLoginsPartial", externalLogins);
        }

        #region Helpers
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }
            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                OAuthWebSecurity.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
        #endregion
    }
}
