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
              if (jsonData.IsArray)
                return jsonData;
              else
                return jsonData["Form Responses 2"];
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
              data: null,
              render: function (data, type, row) {
                var html = []
                if (row.Phone && row.Phone.lengt !== 0) {
                  html.push("<a href='tel:" + row.Phone + "'>" + row.Phone + "</a>");
                }
                if (row.Email && row.Email.length !== 0) {
                    html.push("<a href='mailto:" + row.Email + "'>" + row.Email + "</a>");
                }
                if (html.length !== 0)
                  return html.join(" - ");
                else
                  return "";
              }
            },
            {
              data: null,
              render: function (data, type, row) {
                var html = []
                if (row.Website && row.Website.length !== 0)
                  html.push("<a href='" + row.Website + "'>Website</a>");
                if (row.Facebook && row.Facebook.length !== 0)
                  html.push("<a href='" + row.Facebook + "'>Facebook</a>");
                if (row.Instagram && row.Instagram.length !== 0)
                    html.push("<a href='" + row.Instagram + "'>Instagram</a>");
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
