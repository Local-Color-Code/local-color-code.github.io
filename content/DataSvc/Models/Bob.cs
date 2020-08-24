using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyCsvParser.Mapping;

namespace Data.Models
{
    public class Bob
    {
        public string Timestamp { get; set; }
        public string Name { get; set; }
        public string Business { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }

    }

    public class CsvBobMapping : CsvMapping<Bob>
    {
        public CsvBobMapping()
            : base()
        {
            MapProperty(0, x => x.Timestamp);
            MapProperty(1, x => x.Name);
            MapProperty(2, x => x.Business);
            MapProperty(3, x => x.Phone);
            MapProperty(4, x => x.Email);
            MapProperty(5, x => x.Address);
            MapProperty(6, x => x.Website);
            MapProperty(7, x => x.Facebook);
            MapProperty(8, x => x.Instagram);
        }
    }
}
