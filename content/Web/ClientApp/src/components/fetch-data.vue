<template>
  <table class="table table-sm table-bordered nowrap" style="width:100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Business</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Website</th>
      </tr>
    </thead>
  </table>
</template>

<script>
  import "bootstrap";
  import "datatables.net-bs4";
  import "datatables.net-fixedheader-bs4";
  import "datatables.net-responsive-bs4";

  export default {
    components: {

    },
    data() {
      return {

      };
    },
    mounted: function () {
      var vm = this;

      var _table = $(vm.$el).DataTable(
        {

          ajax: {
            url: process.env.VUE_APP_FETCHDATA_ENDPOINT,
            type: "GET",
            dataSrc: function (jsonData) {
              return jsonData;
            }
          },
          fixedHeader: true,
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
          },
          lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
          pageLength: 25,
          columns: [
            { data: "Name" },
            { data: "Business" },
            { data: "Address" },
            {
              data: "Contact",
              render: function (data, type, row) {
                if (data && data.length !== 0) {
                  if (data.includes('@'))
                    return "<a href='mailto:" + data + "'>" + data + "</a>";
                  else {
                    return "<a href='tel:" + data + "'>" + data + "</a>";
                  }
                }
                return "";
              }
            },
            {
              data: 'Website',
              render: function (data, type, row) {
                var html = []
                if (row.Website && row.Website.length !== 0) {
                  html.push("<a href='" + row.Website + "'>Website</a>");
                }
                if (row.FB && row.Website.FB !== 0) {
                  if (row.FB.includes('facebook'))
                    html.push("<a href='" + row.FB + "'>Facebook</a>");
                  if (row.FB.includes('instagram'))
                    html.push("<a href='" + row.FB + "'>Instagram</a>");
                }
                if (html.length !== 0)
                  return html.join(" - ");
                else
                  return "";
              }
              
            }
          ],
          filter: true,
          paginate: true,
          responsive: true,
          ordering: true
        });

    }
  };
</script>
<style>
  table.dataTable.dtr-inline.collapsed.table-sm > tbody > tr > td:first-child:before, table.dataTable.dtr-inline.collapsed.table-sm > tbody > tr > th:first-child:before {

      top: 15px !important;
  }
</style>
