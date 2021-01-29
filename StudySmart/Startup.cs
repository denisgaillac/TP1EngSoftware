using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using StudySmart.Models.Data;

namespace StudySmart
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddCors(options =>
            {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200/")
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                    //.SetIsOriginAllowedToAllowWildcardSubdomains();
                });
            });

            var connection = Configuration["ConnectionStrings:PostgreSqlConnectionString"];
            services.AddDbContext<Context>(options =>
            options.UseNpgsql(Configuration.GetConnectionString(connection)));
            services.AddMvc();
            //services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            // {
            //     app.UseDeveloperExceptionPage();
            // }
            // else
            // {
            //     app.UseExceptionHandler("/Home/Error");
            //     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //     app.UseHsts();
            // }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);

            var cookiePolicyOptions = new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax,
                Secure = CookieSecurePolicy.SameAsRequest
            };

            app.UseCookiePolicy(cookiePolicyOptions);

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "Tela de Atividades",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}