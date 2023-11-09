using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Entities.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "defbe339-12bf-429a-b1c4-944c6ae511ed");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e8071681-1157-4932-b40c-9f6f47ae0418");

            migrationBuilder.AddColumn<decimal>(
                name: "InitialPrice",
                table: "Products",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05ff2c8e-9652-406a-99b2-a288872f9f81", null, "Admin", "ADMIN" },
                    { "adbe0f5e-85fc-49b4-9d86-904161a666a1", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05ff2c8e-9652-406a-99b2-a288872f9f81");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "adbe0f5e-85fc-49b4-9d86-904161a666a1");

            migrationBuilder.DropColumn(
                name: "InitialPrice",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "defbe339-12bf-429a-b1c4-944c6ae511ed", null, "User", "USER" },
                    { "e8071681-1157-4932-b40c-9f6f47ae0418", null, "Admin", "ADMIN" }
                });
        }
    }
}
