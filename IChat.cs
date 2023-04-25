public interface IChat
{
    Task ReceiveMessage(string message);
}