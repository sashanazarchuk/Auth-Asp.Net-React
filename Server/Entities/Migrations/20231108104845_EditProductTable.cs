using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Entities.Migrations
{
    /// <inheritdoc />
    public partial class EditProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "362c3b3a-00fa-4658-bbc3-2029621fb9bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bf0677b0-d689-4fc6-96a3-0d453af6047e");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Products",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "defbe339-12bf-429a-b1c4-944c6ae511ed", null, "User", "USER" },
                    { "e8071681-1157-4932-b40c-9f6f47ae0418", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "defbe339-12bf-429a-b1c4-944c6ae511ed");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e8071681-1157-4932-b40c-9f6f47ae0418");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "362c3b3a-00fa-4658-bbc3-2029621fb9bf", null, "Admin", "ADMIN" },
                    { "bf0677b0-d689-4fc6-96a3-0d453af6047e", null, "User", "USER" }
                });
        }
    }
}
