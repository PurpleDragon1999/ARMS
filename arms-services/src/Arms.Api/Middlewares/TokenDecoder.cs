using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Arms.Api.Middlewares
{
    public class TokenDecoder

    {
        public string id;
        public TokenDecoder(HttpRequest Request)
        {

            string token = Request.Headers["Authorization"];
            var jwt = token.Replace("Bearer ", string.Empty);
            var handler = new JwtSecurityTokenHandler();

            var jsonDecodedToken = handler.ReadToken(jwt) as JwtSecurityToken;
            Console.WriteLine(jsonDecodedToken.Payload["Id"].ToString());
             id = jsonDecodedToken.Payload["Id"].ToString();
           }

    }
}
