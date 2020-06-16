<template>
  <table class="table table-sm table-bordered nowrap" style="width:100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Business</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Website</th>
        <th>FB/IG</th>
      </tr>
    </thead>
  </table>
</template>

<script>
  import "bootstrap";
  import "datatables.net-bs4";
  import "datatables.net-fixedheader-bs4";

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
            url: process.env.VUE_APP_ROOT_DATA_API + "Bob",
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
            { data: "Contact" },
            {
              data: "Website",
              render: function (data, type, row) {
                  return "<a href='" + data + "'>Link</a>";
              }
            },
            {
              data: "FB",
              render: function (data, type, row) {
                  return "<a href='" + data + "'>Link</a>";
              }
            }
          ],
          filter: true,
          paginate: true,
          ordering: true
        });

    }
  };
</script>
<style>

</style>
