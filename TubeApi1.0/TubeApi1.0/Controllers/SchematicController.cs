using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using TubeApi1._0.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System;
using Microsoft.AspNetCore.Hosting;

namespace TubeApi1._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchematicController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public SchematicController(IConfiguration configuration,IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select SchematicID, ModName, SchematicName from
                            dbo.Schematic
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
        public JsonResult Post(Schematic schem)
        {
            string query = @"
                           insert into dbo.Schematic
                           values (@SchematicID,@ModName,@SchematicName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SchematicID", schem.SchematicID);
                    myCommand.Parameters.AddWithValue("@ModName", schem.ModName);
                    myCommand.Parameters.AddWithValue("@SchematicName", schem.SchematicName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Schematic schem)
        {
            string query = @"
                            update dbo.Schematic
                           set ModName=@ModName,
                            SchematicName=@SchematicName
                            where SchematicID=@SchematicID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SchematicID", schem.SchematicID);
                    myCommand.Parameters.AddWithValue("@ModName", schem.ModName);
                    myCommand.Parameters.AddWithValue("@SchematicName", schem.SchematicName);
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
                            delete dbo.Schematic
                            where SchematicID=@SchematicID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TubeapiCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SchematicID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
        [Route("savefile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile= httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/DataFiles/" + filename;

                using(var stream=new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("error");
            }
        }

        
    }
}
