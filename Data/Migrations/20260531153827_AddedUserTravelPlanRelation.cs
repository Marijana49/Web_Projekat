using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserTravelPlanRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TravelPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TravelPlans_UserId",
                table: "TravelPlans",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TravelPlans_Users_UserId",
                table: "TravelPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TravelPlans_Users_UserId",
                table: "TravelPlans");

            migrationBuilder.DropIndex(
                name: "IX_TravelPlans_UserId",
                table: "TravelPlans");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TravelPlans");
        }
    }
}
