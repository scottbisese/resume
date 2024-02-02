var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "OKAY, STEP ONE DONE!");
app.UseStaticFiles();

app.Run();
