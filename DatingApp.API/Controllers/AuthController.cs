using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto UserForRegisterDto)
        {
            UserForRegisterDto.UserName = UserForRegisterDto.UserName.ToLower();
            if (await _repo.UserExists(UserForRegisterDto.UserName))
                return BadRequest("User Already Exists");
            var userToCreate = _mapper.Map<User>(UserForRegisterDto);
            var createUser = await _repo.Register(userToCreate, UserForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createUser);
            return CreatedAtRoute("GetUser",new { controller="Users",id= createUser.Id},userToReturn);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto UserForLoginDto)
        {


            var userFromRepo = await _repo.Login(UserForLoginDto.Username.ToLower(), UserForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                          .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user

            });
        }
    }
}