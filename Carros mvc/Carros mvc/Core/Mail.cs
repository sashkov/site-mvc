using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web.Configuration;

namespace Carros_mvc.Core
{
    public class Mail
    {
        public static bool Send(string address, string subject, string mailBody,
            Dictionary<string, string> filenameContent, out string errorMsg)
        {
            errorMsg = string.Empty;
            MailMessage message = new MailMessage();
            try
            {
                SmtpClient client = new SmtpClient("mail.comepay.local");
                client.Timeout = 60000;
                message.From = new System.Net.Mail.MailAddress("reports@comepay.ru");
                string[] addresses = address.Split(new char[] {';'}, StringSplitOptions.RemoveEmptyEntries);
                foreach (string item in addresses) message.To.Add(item);

                message.Subject = subject;
                message.Body = mailBody;

                foreach (KeyValuePair<string, string> file in filenameContent)
                {
                    byte[] buffer = Encoding.GetEncoding(1251).GetBytes(file.Value);
                    MemoryStream stream = new MemoryStream();
                    stream.Write(buffer, 0, buffer.Length);
                    stream.Seek(0, SeekOrigin.Begin);
                    Attachment attach = new Attachment(stream, file.Key);
                    message.Attachments.Add(attach);
                }
                client.Send(message);
                return true;
            }
            catch (SmtpFailedRecipientsException e)
            {
                errorMsg =
                    string.Format(
                        "SmtpFailedRecipientsException. В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\"",
                        address, e.Message);
                return false;
            }
            catch (SmtpException e)
            {
                errorMsg =
                    string.Format(
                        "SmtpException. В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\". InnerException: {2}\n StackTrace: {3}",
                        address, e.Message, e.InnerException.Message, e.StackTrace);
                return false;
            }
            catch (Exception e)
            {
                errorMsg = string.Format("В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\"", address,
                    e.Message);
                return false;
            }
            finally
            {


            }
        }
        public static bool Send2Yandex(string addressTo, string subject, string mailBody, out string errorMsg)
        {

            // var a = WebConfigurationManager.ConnectionStrings.Count;
            // Console.WriteLine(WebConfigurationManager.AppSettings["EmailSMTPServer"]);
            errorMsg = string.Empty;
            try
            {

                var EmailServerName = WebConfigurationManager.AppSettings["SMTPServerName"];
                int port = int.Parse(WebConfigurationManager.AppSettings["SMTPServerPort"]);
                var SenderAndLogin = WebConfigurationManager.AppSettings["SMTPSenderAndLogin"];
                var pass = WebConfigurationManager.AppSettings["SMTPLoginPass"];
                bool useSsl = bool.Parse(WebConfigurationManager.AppSettings["SMTPUseSSL"]);

                var mail = new MailMessage();
                mail.From = new MailAddress(SenderAndLogin);
                mail.To.Add( new MailAddress(addressTo));
                mail.Subject = subject;
                mail.Body = mailBody;
                mail.IsBodyHtml = true;
                
                SmtpClient client = new SmtpClient(EmailServerName, port);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(SenderAndLogin, pass);
                client.EnableSsl = useSsl;
                client.Send(mail);
                                
                return true;
            }
            catch (SmtpFailedRecipientsException e)
            {
                errorMsg =
                    string.Format(
                        "SmtpFailedRecipientsException. В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\"",
                        addressTo, e.Message);
                return false;
            }
            catch (SmtpException e)
            {
                errorMsg =
                    string.Format(
                        "SmtpException. В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\". InnerException: {2}\n StackTrace: {3}",
                        addressTo, e.Message, e.InnerException.Message, e.StackTrace);
                return false;
            }
            catch (Exception e)
            {
                errorMsg = string.Format("В процессе отправки сообщения по адресу {0}  возникла ошибка \"{1}\"", addressTo,
                    e.Message);
                return false;
            }
            finally
            {


            }
        }
    }
}
