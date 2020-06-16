using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace Data
{
    public class Startup
    {
        private readonly string AllowSpecificWebsiteOrigin = "AllowSpecificWebsiteOrigin";
        private readonly string AllowAllWebsiteOrigin = "AllowAllWebsiteOrigin";
        private readonly string WebsiteOriginBaseUri = "ConnectionSettings:WebsiteOriginBaseUri";
        //private readonly ILogger<Startup> _logger;

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
            services.AddCors(options =>
            {
                string[] array = Config[WebsiteOriginBaseUri].Split(";");

                options.AddPolicy(AllowSpecificWebsiteOrigin,
                        builder => builder.WithOrigins(array)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("WWW-Authenticate"));

                options.AddPolicy(AllowAllWebsiteOrigin,
                       builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            services.AddControllers()
                    .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //Applying here is global
            if (Env.IsEnvironment("development"))
                app.UseCors(AllowAllWebsiteOrigin);
            else
            {
                app.UseCors(AllowSpecificWebsiteOrigin);

            }
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
