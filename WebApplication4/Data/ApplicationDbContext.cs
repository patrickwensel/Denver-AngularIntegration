using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication4.Models;

namespace WebApplication4.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "e4e7188b-6ecb-4278-aeee-17271f20d7ce", Name = "Admin", NormalizedName = "ADMIN".ToUpper() });

            var hasher = new PasswordHasher<ApplicationUser>();

            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "c9030b6f-cb74-4e59-8ba8-4d35e834a556", // primary key
                    UserName = "pwensel@hotmail.com",
                    NormalizedUserName = "PWENSEL@HOTMAIL.COM",
                    Email = "pwensel@hotmail.com",
                    NormalizedEmail = "PWENSEL@HOTMAIL.COM",
                    EmailConfirmed = true,
                    PasswordHash = hasher.HashPassword(null, "P@55word"),
                    SecurityStamp = Guid.NewGuid().ToString("D")
                }
            );

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = "e4e7188b-6ecb-4278-aeee-17271f20d7ce",
                    UserId = "c9030b6f-cb74-4e59-8ba8-4d35e834a556"
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
