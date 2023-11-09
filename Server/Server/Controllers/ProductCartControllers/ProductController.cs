using BusinessLogic.DTOs.ProductCartDTOs;
using BusinessLogic.Interfaces.ProductCartServices;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers.ProductCartControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService<ProductDto> service;   // Service dependency for product operations.
        private readonly ILoggerManager logger;                 // Logger for event logging.

        public ProductController(IProductService<ProductDto> service, ILoggerManager logger)
        {
            this.service = service;
            this.logger = logger;
        }


        //Retrieves a list of all products and returns them as a response.
        [HttpGet("GetAllProduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            try
            {
                var result = await service.GetAllProduct(); // Retrieve a list of all products from product service

                // Check if the result is null
                if (result == null)
                {
                    logger.LogError("A NullReferenceException occurred while receiving the products");
                    return BadRequest("A NullReferenceException occurred while receiving the products"); // Returning a bad request with an error message.
                }

                logger.LogInfo("Product list return successfully");
                return Ok(result);// Returning a successful response with the product list.
            }
            catch (Exception ex)
            {

                logger.LogError("An error occurred while receiving the products: " + ex.Message);
                return BadRequest("An error occurred while receiving the products"); // Returning a bad request with an error message.
            }
        }

        // GET: api/products/GetById/{id}
        // Retrieve a product by its unique identifier.
        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                var result = service.GetById(id);
                if (result == null) return NotFound(); // Product not found, return 404
                return Ok(result); // Return the product data as OK (200) response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while receiving the current product: " + ex.Message);
                return BadRequest("An error occurred while receiving the current product"); // Return a Bad Request (400) response in case of an exception
            }
        }

        // GET: api/products/Create-Product
        // Creatind a new Product in Db
        [Authorize(Roles = "Admin")]
        [HttpPost("Create-Product")]
        public async Task<IActionResult> Create([FromBody] ProductDto product)
        {
            try
            {
                await service.CreateProduct(product);// Call the service to create the product in the database.
                return Ok(); // Return successfuly response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while creating the current product: " + ex.Message);
                return BadRequest("An error occurred while creating the current product"); // Return a Bad Request (400) response in case of an exception
            }

        }


        // DELETE: api/products/Delete-Product
        // Deleting a Product from Db
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete-Product/{productId}")]
        public async Task<IActionResult> Delete([FromRoute] int productId)
        {
            try
            {
                await service.DeleteProduct(productId);// Call the service to delete the product from the database.
                return Ok(); // Return successfuly response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while deleting the current product: " + ex.Message);
                return BadRequest("An error occurred while deleting the current product"); // Return a Bad Request (400) response in case of an exception
            }

        }

        // PUT: api/products/Edit-Product
        // Editing a Product in Db
        [Authorize(Roles = "Admin")]
        [HttpPut("Edit-Product")]
        public async Task<IActionResult> EditProduct([FromBody] ProductDto product)
        {
            try
            {
                await service.EditProduct(product);// Call the service to edit the product in the database.
                return Ok(); // Return successfuly response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while editing the current product: " + ex.Message);
                return BadRequest("An error occurred while editing the current product"); // Return a Bad Request (400) response in case of an exception
            }

        }

        // PUT: api/products/Discount-Product
        // Added Discount for Product
        [Authorize(Roles = "Admin")]
        [HttpPut("Discount-Product/{productId}")]
        public async Task<IActionResult> ApplyDiscount(int productId, decimal discount)
        {
            try
            {
                await service.Discount(productId, discount); // Call the service to make discount for product in the database
                return Ok("Discount successfully applied.");// Return successfuly response
            }
            catch (ArgumentException ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }


        // GET: api/products/Search?searchText={searchText}
        // Search for products based on a provided search text.
        [HttpGet("Search")]
        public async Task<IActionResult> SearchProducts(string searchText)
        {
            if (string.IsNullOrEmpty(searchText))
            {
                return BadRequest("Search text is required."); // Return a Bad Request (400) response when search text is empty
            }

            var searchResults = await service.Search(searchText);
            return Ok(searchResults); // Return the search results as OK (200) response
        }

        // GET: api/products/Sort-L-H
        // Retrieve and return products sorted in ascending order (Low to High).
        [HttpGet("Sort-L-H")]
        public async Task<IActionResult> SortLtoH()
        {
            try
            {
                var result = await service.SortLtoH();
                return Ok(result); // Return the sorted results as OK (200) response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while receiving the sorted products: " + ex.Message);
                return BadRequest("An error occurred while receiving the sorted products"); // Return a Bad Request (400) response in case of an exception
            }
        }

        // GET: api/products/Sort-H-L
        // Retrieve and return products sorted in descending order (High to Low).
        [HttpGet("Sort-H-L")]
        public async Task<IActionResult> SortHtoL()
        {
            try
            {
                var result = await service.SortHtoL();
                return Ok(result); // Return the sorted results as OK (200) response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while receiving the sorted products: " + ex.Message);
                return BadRequest("An error occurred while receiving the sorted products"); // Return a Bad Request (400) response in case of an exception
            }
        }

        // GET: api/products/Sort-A-Z
        // Retrieve and return products sorted in ascending alphabetical order (A to Z).
        [HttpGet("Sort-A-Z")]
        public async Task<IActionResult> SortAtoZ()
        {
            try
            {
                var result = await service.SortAtoZ();
                return Ok(result); // Return the sorted results as OK (200) response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while receiving the sorted products: " + ex.Message);
                return BadRequest("An error occurred while receiving the sorted products"); // Return a Bad Request (400) response in case of an exception
            }
        }

        // GET: api/products/Sort-Z-A
        // Retrieve and return products sorted in descending alphabetical order (Z to A).
        [HttpGet("Sort-Z-A")]
        public async Task<IActionResult> SortZtoA()
        {
            try
            {
                var result = await service.SortZtoA();
                return Ok(result); // Return the sorted results as OK (200) response
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred while receiving the sorted products: " + ex.Message);
                return BadRequest("An error occurred while receiving the sorted products"); // Return a Bad Request (400) response in case of an exception
            }
        }

        // GET: api/products/Filter-Product
        // Filter products based on Color, Brand, Appointment, Country, Gender, and Size query parameters.
        [HttpGet("Filter-Product")]
        public async Task<IActionResult> FilterProducts(
            [FromQuery] List<string> Color,
            [FromQuery] List<string> Brand,
            [FromQuery] List<string> Appointment,
            [FromQuery] List<string> Country,
            [FromQuery] List<string> Gender,
            [FromQuery] List<string> Size)
        {
            try
            {
                var result = await service.FilterProduct(Color, Brand, Appointment, Country, Gender, Size);
                return Ok(result); // Return the filtered results as OK (200) response
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while receiving the filtered products: " + ex.Message); // Return a Bad Request (400) response in case of an exception
            }
        }

    }
}