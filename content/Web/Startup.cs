using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VueCliMiddleware;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            Config = config;
            Env = env;
        }

        private readonly IConfiguration Config;
        private readonly IWebHostEnvironment Env;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (Env.IsEnvironment("development"))
            {
                services.AddControllers();
                services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp";
                });
            }
            else
            {
                services.AddRazorPages();
            }

            // Added - uses IOptions<T> for your settings.
            services.AddOptions();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {

            if (Env.IsEnvironment("development"))
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                if (!Env.IsEnvironment("development"))
                {
                    endpoints.MapDefaultControllerRoute();
                }
            });

            if (Env.IsEnvironment("development"))
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";
                    spa.UseVueCli(npmScript: "serve:dev", 8080);
                });
            }
        }
    }
}
