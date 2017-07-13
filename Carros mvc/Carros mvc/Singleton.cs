//========================================================================
// ќдиночка, (англ. Singleton) Ч порождающий шаблон проектировани€.
// http://ru.wikipedia.org/wiki/Singleton
//========================================================================
namespace Carros_mvc
{
    // generic Singleton<T> (потокобезопасный с использованием generic-класса и с отложенной инициализацией)

    /// <typeparam name="T">Singleton class</typeparam>
    public class Singleton<T> where T : class, new()
    {
        /// «ащищенный конструктор по умолчанию необходим дл€ того, чтобы
        /// предотвратить создание экземпл€ра класса Singleton
        protected Singleton() { }

        /// ‘абрика используетс€ дл€ отложенной инициализации экземпл€ра класса
        private sealed class SingletonCreator<S> where S : class, new()
        {
            private static readonly S Instance = new S();
            public static S CreatorInstance
            {
                get
                {
                    return Instance; 
                }
            }
        }

        public static T Instance
        {
            get { return SingletonCreator<T>.CreatorInstance; }
        }
    }
}