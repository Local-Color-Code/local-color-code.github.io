using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyCsvParser.Mapping;

namespace Data.Models
{
    public class Bob
    {
        public string Name { get; set; }
        public string Business { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Website { get; set; }
        public string FB { get; set; }

    }

    public class CsvBobMapping : CsvMapping<Bob>
    {
        public CsvBobMapping()
            : base()
        {
            MapProperty(0, x => x.Name);
            MapProperty(1, x => x.Business);
            MapProperty(2, x => x.Address);
            MapProperty(3, x => x.Contact);
            MapProperty(4, x => x.Website);
            MapProperty(5, x => x.FB);
        }
    }
}
