using BusinessLogic.Interfaces.IEmailService;
using BusinessLogic.Interfaces.IProductCartServices;
using Entities.Data;
using Entities.Models.Enitites;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;


namespace BusinessLogic.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration config;
        private readonly AppDbContext context;
        private readonly ICartService<CartItem> service;
        public EmailService(IConfiguration config, AppDbContext context, ICartService<CartItem> service)
        {
            this.config = config;
            this.context = context;
            this.service = service;
        }

        public async Task Send(string userId)
        {
            // Get the user's shopping cart items by their user ID
            var cartItems = context.CartItem
                .Include(item => item.Product)
                .Where(item => item.User.Id == userId)
                .ToList();

            // Get the user's name, email, phone, country, and city
            var user = context.Users
                .Include(u => u.Country)
                .Include(u => u.City)
                .FirstOrDefault(u => u.Id == userId);
            var userName = user?.UserName;
            var userEmail = user?.Email;
            var userPhone = user?.Phone;
            var userCountry = user?.Country.Name;
            var userCity = user?.City.Name;

            // Calculate the total purchase amount
            decimal totalAmount = service.GetTotalPrice(userId);

            // Create a message for sending
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(userName, userEmail));
            message.To.Add(new MailboxAddress("Admin", config["EmailUsername"]));
            message.Subject = "New order";

            var builder = new BodyBuilder();

            // HTML template for the email
            var htmlTemplate = @"
        <!DOCTYPE html>
        <html>
        <head>
           <style>
        /* Styles for the container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            font-family: Arial, sans-serif;
        }

        /* Styles for the header */
        .header {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
        }

        /* Styles for the product image */
        .product-image {
            max-width: 100px;
            height: auto;
            float: left;
            margin-right: 10px;
        }

        /* Styles for product information */
        .product-info {
            display: inline-block;
            font-size: 16px;
        }

        /* Styles for the list of items */
        .order-details {
            margin-top: 20px;
            font-size: 16px;
        }
        
        /* Styles for the list of items */
        .order-details ul {
            list-style-type: none;  
            padding: 0;  
        }

        /* Styles for list items */
        .order-details li {
        margin-bottom: 10px; /* Встановлює відступ між елементами списку */
        }
        
        /* Styles for the total amount */
        .total-amount {
            margin-top: 20px;
            font-size: 18px;
        }

        /* Styles for the divider */
        .divider {
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }

        /* Styles for the divider text */
        .divider-text {
            text-align: center;
            color: #999;
            font-size: 20px;
        }

        .delivery-text{
            font-size:20px;
        }

        /* Styles for the copyright signature */
        .copyright {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }
    </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    Thank You for Your Purchase!
                </div>
                <div class='order-details'>
                    <h2>Items Ordered:</h2>
                    <ul>";

            // Add shopping cart items to the template
            foreach (var cartItem in cartItems)
            {
                htmlTemplate += $@"
            <li>
                <div>
                    <img class='product-image' src='{cartItem.Product.Image}' alt='{cartItem.Product.Name}'>
                    <h4> {cartItem.Product.Name}</h4>
                    <p>{cartItem.Product.Price:C}</p>
                </div>
            </li>";
            }

            // Closing the HTML template
            htmlTemplate += $@"
                    </ul>
                </div>
                <h1 class='total-amount'>
                    Total Amount: {totalAmount:C}
                </h1>
                <div class='divider'></div>
                <div class='delivery-details'>
                    <h2>Delivery Details:</h2>
                    <p class='delivery-text'> {userName}</p>
                    <p class='delivery-text'> {userPhone}</p>
                    <p class='delivery-text'> {userCountry}</p>
                    <p class='delivery-text'> {userCity}</p>
                </div>
                <div class='divider'></div>
                <div class='copyright'>
                    &copy; 2023 All rights reserved
                </div>
            </div>
        </body>
        </html>
    ";

            // Set the HTML body in BodyBuilder
            builder.HtmlBody = htmlTemplate;

            // Set the HTML body in the email message
            message.Body = builder.ToMessageBody();

            using (var smtpClient = new SmtpClient())
            {
                // Connect to the SMTP server
                await smtpClient.ConnectAsync(config["EmailHost"], 587, SecureSocketOptions.StartTls);

                // Authenticate with the SMTP server
                await smtpClient.AuthenticateAsync(config["EmailUsername"], config["EmailPassword"]);
              
                // Send the email message
                await smtpClient.SendAsync(message);

                // Disconnect from the SMTP server
                await smtpClient.DisconnectAsync(true);
            }
        }

    }
}