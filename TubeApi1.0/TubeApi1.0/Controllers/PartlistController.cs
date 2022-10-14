using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using TubeApi1._0.Models;

namespace TubeApi1._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartlistController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PartlistController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select ModID, ModName, PartlistName from
                            dbo.Partlist
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Partlist par)
        {
            string query = @"
                           insert into dbo.Partlist
                           values (@ModID,@ModName,@PartlistName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ModID", par.ModID);
                    myCommand.Parameters.AddWithValue("@ModName", par.ModName);
                    myCommand.Parameters.AddWithValue("@PartlistName", par.PartlistName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Partlist par)
        {
            string query = @"
                            update dbo.Partlist
                           set ModName=@ModName,
                            PartlistName=@PartlistName
                            where ModID=@ModID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ModID", par.ModID);
                    myCommand.Parameters.AddWithValue("@ModName", par.ModName);
                    myCommand.Parameters.AddWithValue("@PartlistName", par.PartlistName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete dbo.Partlist
                            where ModID=@ModID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ModID", id);
                  
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
