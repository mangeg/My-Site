using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.Operations;

namespace Site.Migrations
{
    public partial class RenameDashboard : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.DropTable("Hero");
            migration.CreateTable(
                name: "Dashboard_Dashboard",
                columns: table => new
                {
                    Id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGeneration", "Identity"),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dashboard", x => x.Id);
                });
            migration.CreateTable(
                name: "Dashboard_Widget",
                columns: table => new
                {
                    Id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGeneration", "Identity"),
                    ColX = table.Column(type: "int", nullable: false),
                    ColY = table.Column(type: "int", nullable: false),
                    DashboardId = table.Column(type: "int", nullable: false),
                    SizeX = table.Column(type: "int", nullable: false),
                    SizeY = table.Column(type: "int", nullable: false),
                    Title = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Widget", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Widget_Dashboard_DashboardId",
                        columns: x => x.DashboardId,
                        referencedTable: "Dashboard_Dashboard",
                        referencedColumn: "Id");
                });
        }
        
        public override void Down(MigrationBuilder migration)
        {
            migration.DropTable("Dashboard_Dashboard");
            migration.DropTable("Dashboard_Widget");
            migration.CreateTable(
                name: "Hero",
                columns: table => new
                {
                    Id = table.Column(type: "int", nullable: false),
                    LocalizedName = table.Column(type: "nvarchar(max)", nullable: true),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hero", x => x.Id);
                });
        }
    }
}
