//========================================================================
// ��������, (����. Singleton) � ����������� ������ ��������������.
// http://ru.wikipedia.org/wiki/Singleton
//========================================================================
namespace Carros_mvc
{
    // generic Singleton<T> (���������������� � �������������� generic-������ � � ���������� ��������������)

    /// <typeparam name="T">Singleton class</typeparam>
    public class Singleton<T> where T : class, new()
    {
        /// ���������� ����������� �� ��������� ��������� ��� ����, �����
        /// ������������� �������� ���������� ������ Singleton
        protected Singleton() { }

        /// ������� ������������ ��� ���������� ������������� ���������� ������
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