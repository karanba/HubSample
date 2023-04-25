using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HubSample.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IHubContext<ChatHub, IChat> hubContext;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IHubContext<ChatHub, IChat> hubContext)
    {
        this.hubContext = hubContext;

        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        this.hubContext.Clients.All.ReceiveMessage("test received message");

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

}
