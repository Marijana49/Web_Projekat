using Data.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelService.Services.Interface;

namespace TravelService.Controllers
{
    [Route("api/travel")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpPost("newDestination/{id}")]
        public async Task<IActionResult> AddNewDestination(int id,[FromBody]CreateDestinationDto dto)
        {
            if(dto == null)
            {
                return BadRequest("Prazni podaci");
            }
            
            if (!ModelState.IsValid)
            {
                //return BadRequest(ModelState);
                foreach (var modelStateKey in ModelState.Keys)
                {
                    var value = ModelState[modelStateKey];
                    foreach (var error in value.Errors)
                    {
                        System.Diagnostics.Debug.WriteLine($"Greška u {modelStateKey}: {error.ErrorMessage}");
                    }
                }
                return BadRequest(ModelState);
            }

            try
            {
                await _destinationService.CreateDestinationAsync(id, dto);
                return Ok();
            } catch(Exception) 
            {
                return BadRequest();
            }
        }
    }
}
