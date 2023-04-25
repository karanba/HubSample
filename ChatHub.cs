using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub<IChat>
{
    public async Task SendMessage(string message)
    {
        await Clients.All.ReceiveMessage(message);
    }
}