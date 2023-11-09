using AutoMapper;
using BusinessLogic.DTOs.ProductCartDTOs;
using BusinessLogic.Interfaces.ProductCartServices;
using Contracts;
using Entities.Data;
using Entities.Models.Enitites;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.ProductServices
{
    // Service for working with products and product DTO objects.
    public class ProductService : IProductService<ProductDto>
    {
        private readonly AppDbContext context;  // Dependency for database access.
        private readonly IMapper mapper;        // Mapper for object transformation.
        private readonly ILoggerManager logger; // Logger for event logging.

        // Constructor for the service, where dependencies are set.
        public ProductService(AppDbContext context, IMapper mapper, ILoggerManager logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;
        }

        // Method to retrieve all products from the database as ProductDto objects.
        public async Task<IEnumerable<ProductDto>> GetAllProduct()
        {
            try
            {
                var product = await context.Products.ToListAsync(); // Retrieving the list of products from the database.
                logger.LogInfo("Product list showed successfully");

                // Transforming and returning the list of products in DTO format.
                return mapper.Map<IEnumerable<ProductDto>>(product);
            }
            catch (DbUpdateException ex)
            {
                logger.LogError("An error occurred while updating the database" + ex.Message);
                throw;// Propagating the exception for further handling.
            }
            catch (InvalidOperationException ex)
            {
                logger.LogError("An error occurred due to an invalid operation" + ex.Message);
                throw;// Propagating the exception for further handling.
            }
            catch (Exception ex)
            {
                logger.LogError("An unexpected error occurred during showing product list" + ex.Message);
                throw;// Propagating the exception for further handling.
            }
        }

        public ProductDto GetById(int id)
        {
            // Retrieve a product by its unique identifier and include related Country information.
            var product = context.Products.Include(c => c.Country).FirstOrDefault(c => c.ProductId == id);

            if (product == null) return null; // If the product is not found, return null.

            return mapper.Map<ProductDto>(product); // Map and return the product data as a ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> Search(string search)
        {
            if (string.IsNullOrEmpty(search))
            {
                return Enumerable.Empty<ProductDto>(); // If the search text is empty or null, return an empty collection of ProductDto.
            }

            // Search for products whose names contain the provided search text.
            var searchResults = await context.Products
                .Where(p => p.Name.Contains(search))
                .ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(searchResults); // Map and return the search results as ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> SortLtoH()
        {
            // Sort products in ascending order of price (Low to High).
            var sortedProducts = await context.Products.OrderBy(product => product.Price).ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(sortedProducts); // Map and return the sorted products as ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> SortHtoL()
        {
            // Sort products in descending order of price (High to Low).
            var sortedProducts = await context.Products.OrderByDescending(product => product.Price).ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(sortedProducts); // Map and return the sorted products as ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> SortAtoZ()
        {
            // Sort products in ascending alphabetical order of product names (A to Z).
            var sortedProducts = await context.Products.OrderBy(product => product.Name).ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(sortedProducts); // Map and return the sorted products as ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> SortZtoA()
        {
            // Sort products in descending alphabetical order of product names (Z to A).
            var sortedProducts = await context.Products.OrderByDescending(product => product.Name).ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(sortedProducts); // Map and return the sorted products as ProductDto.
        }

        public async Task<IEnumerable<ProductDto>> FilterProduct(List<string> colors, List<string> brands, List<string> appointments, List<string> countries, List<string> genders, List<string> sizes)
        {
            // Filter products based on various criteria, including Color, Brand, Appointment, Country, Gender, and Size.
            var filteredProducts = await context.Products
                .Where(product =>
                    (colors.Count == 0 || colors.Contains(product.Color)) &&
                    (brands.Count == 0 || brands.Contains(product.Brand)) &&
                    (appointments.Count == 0 || appointments.Contains(product.Appointment)) &&
                    (countries.Count == 0 || countries.Contains(product.Country.Name)) &&
                    (genders.Count == 0 || genders.Contains(product.Gender)) &&
                    (sizes.Count == 0 || sizes.Contains(product.Size))
                )
                .ToListAsync();

            return mapper.Map<IEnumerable<ProductDto>>(filteredProducts); // Map and return the filtered products as ProductDto.
        }

        public async Task<ProductDto> CreateProduct(ProductDto product)
        {
            // Map the ProductDto to a Product entity
            var result = mapper.Map<Product>(product);

            // Add the new product to the context and save the changes
            await context.Products.AddAsync(result);
            await context.SaveChangesAsync();

            // Map the created Product entity back to a ProductDto and return it
            return mapper.Map<ProductDto>(result);
        }

        public async Task DeleteProduct(int id)
        {
            // Find the product by Id
            var product = await context.Products.FindAsync(id);

            if (product != null)
            {
                // If the product exists, remove it from the context and save the changes
                context.Products.Remove(product);
                await context.SaveChangesAsync();
            }
        }
        public async Task EditProduct(ProductDto product)
        {
            // Find the existing product data 
            var data = await context.Products.AsNoTracking().FirstOrDefaultAsync(w => w.ProductId == product.ProductId);

            if (data != null)
            {
                // Update the product entity with the new data and save the changes
                context.Products.Update(mapper.Map<Product>(product));
                await context.SaveChangesAsync();
            }
        }

        public async Task Discount(int productId, decimal discount)
        {   
            // Find the product by its Id
            var product = await context.Products.FindAsync(productId);

            if (product != null)
            {
                if (discount > 0)
                {
                    // Calculation of the new price with a discount
                    decimal discountedPrice = product.Price - (product.Price * discount / 100);
                    product.Discount = discount;
                    product.Price = discountedPrice;
                }
                else
                {
                    // If there is no discount, we set the original price
                    product.Discount = 0;
                    product.Price = product.InitialPrice; 
                }

                // Save the changes to the database
                await context.SaveChangesAsync();
            }
        }
    }
}