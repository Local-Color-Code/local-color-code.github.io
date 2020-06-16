using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TinyCsvParser;

namespace Data.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BobController : ControllerBase
    {
        CsvParserOptions csvParserOptions;
        CsvBobMapping csvMapper;
        CsvParser<Bob> csvParser;

        private readonly ILogger<BobController> _logger;

        private void initializeCsv()
        {
            csvParserOptions = new CsvParserOptions(true, ',');
            csvMapper = new CsvBobMapping();
            csvParser = new CsvParser<Bob>(csvParserOptions, csvMapper);
        }

        public BobController(ILogger<BobController> logger)
        {
            _logger = logger;
        }

        //[HttpGet("[action]")]
        public IActionResult Get()
        {
            var result = GetBobs();
            var output = JsonConvert.SerializeObject(result);

            return Ok(output);
        }

        private List<Bob> GetBobs()
        {
            initializeCsv();

            string basePath = Environment.CurrentDirectory;
            string relativePath = "./data/bob.csv";
            var path = Path.GetFullPath(relativePath, basePath);

            var result = csvParser.ReadFromFile<Bob>(path, Encoding.UTF8)
                        .Select(x => x.Result)
                        .ToList();

            return result;
        }
    }
}
