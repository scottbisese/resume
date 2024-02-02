var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();

// app.MapGet("/", () => "Hi");
app.MapGet("/", async context =>
{
    var env = app.Environment;
    var path = Path.Combine(env.WebRootPath, "index.html"); // Path to index.html
    var fileExists = File.Exists(path);
    if (fileExists)
    {
        // Read the file content and serve it
        var content = await File.ReadAllTextAsync(path);
        context.Response.ContentType = "text/html";
        await context.Response.WriteAsync(content);
    }
    else
    {
        context.Response.StatusCode = 404; // Not Found if index.html does not exist
    }
});

app.Run();