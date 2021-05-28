using ITfoxtec.Identity.Saml2;
using ITfoxtec.Identity.Saml2.MvcCore;
using ITfoxtec.Identity.Saml2.Schemas;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApplication4.Identity;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("[controller]/[action]")]
    public class AuthController : Controller
    {
        const string relayStateReturnUrl = "ReturnUrl";
        private readonly Saml2Configuration _config;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private IConfiguration _Configuration;
        public AuthController(IOptions<Saml2Configuration> configAccessor, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _config = configAccessor.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _Configuration = configuration;
        }


        //[Route("AssertionConsumerService")]
        public async Task<IActionResult> AssertionConsumerService()
        {
            var binding = new Saml2PostBinding();
            var saml2AuthnResponse = new Saml2AuthnResponse(_config);

            binding.ReadSamlResponse(Request.ToGenericHttpRequest(), saml2AuthnResponse);
            if (saml2AuthnResponse.Status != Saml2StatusCodes.Success)
            {
                throw new AuthenticationException($"SAML Response status: {saml2AuthnResponse.Status}");
            }
            binding.Unbind(Request.ToGenericHttpRequest(), saml2AuthnResponse);
            await saml2AuthnResponse.CreateSession(HttpContext, claimsTransform: (claimsPrincipal) => ClaimsTransform.Transform(claimsPrincipal));

            var relayStateQuery = binding.GetRelayStateQuery();
            var returnUrl = relayStateQuery.ContainsKey(relayStateReturnUrl) ? relayStateQuery[relayStateReturnUrl] : Url.Content("~/");


            var emailAddress = saml2AuthnResponse.ClaimsIdentity.Claims.Where(x => x.Type.Contains("nameidentifier")).FirstOrDefault();
            var user = await _userManager.FindByEmailAsync(emailAddress.Value);
            
            if (user == null)
            {
                user = new ApplicationUser { UserName = emailAddress.Value, Email = emailAddress.Value };

                var result = await _userManager.CreateAsync(user, this._Configuration.GetSection("Password")["DefaultPassword"]);

                if (!result.Succeeded)
                {
                    throw new Exception($"The user {emailAddress.Value} couldn't be created - {result}");
                }
             
            }

            // Automatically login using the asserted identity.
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Redirect("/fetch-data");
        }

    }
}
