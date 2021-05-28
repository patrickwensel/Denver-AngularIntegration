using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication4.Migrations
{
    public partial class table_initialization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4e7188b-6ecb-4278-aeee-17271f20d7ce",
                column: "ConcurrencyStamp",
                value: "840a1fa2-1255-4b63-bf08-f58935d37aec");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c9030b6f-cb74-4e59-8ba8-4d35e834a556",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "af5684f1-e29d-46bc-8698-07c9108cb8f5", "AQAAAAEAACcQAAAAEH693cf5W3EFgYSRZygl1DM0lDZpzFqS0yKUSZdEk8GFxUsHHpcvc+s8LATVzzS3bg==", "f097f57c-438d-4b65-8d13-f95c2627053f" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4e7188b-6ecb-4278-aeee-17271f20d7ce",
                column: "ConcurrencyStamp",
                value: "535354ae-4795-4034-8095-1675e89b4795");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c9030b6f-cb74-4e59-8ba8-4d35e834a556",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a04080f4-0228-4714-ae72-ed3bdba7b1df", "AQAAAAEAACcQAAAAEOyNg0jG5C59zaBg6xEWEGqO91KEqKqQhtgly+iK46DCWxYCriuySrzWDlDCq+PHZA==", "b1345150-d604-4dbb-a543-0c25dae68a53" });
        }
    }
}
