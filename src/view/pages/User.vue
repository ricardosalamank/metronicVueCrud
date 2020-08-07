<template>
  <div id="app">
    <!-- NAVIGATION -->
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Test Vuejs</a>
    </nav>
    <!-- MAIN CONTENT -->
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <h3>{{ title }}</h3>
              <button
                @click="cancelEdit()"
                class="btn btn-danger"
                v-if="newUser.id != 'new'"
                style="float: right;"
              >Cancel</button>
            </div>
            <div class="card-body">
              <form @submit.prevent="addUser">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newUser.name" placeholder="Name" />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="newUser.last"
                    placeholder="Last Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    v-model="newUser.email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <select class="form-control" v-model="newUser.country">
                    <option value disabled selected>select an option</option>
                    <option
                      v-for="(element, index) in countrys"
                      :key="index"
                      v-bind:value="element"
                    >{{ element }}</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
            <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>
          </div>
        </div>
        <div class="col-sm-8 text-center">
          <div class="card">
            <div class="card-header">
              <h3>User List</h3>
            </div>
            <div class="card-body">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td>{{user.name}}</td>
                    <td>{{user.last}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.country}}</td>
                    <td>
                      <button @click="editUser(user)" class="btn btn-success">Edit</button> &nbsp;&nbsp;
                      <button
                        @click="deleteUser(user.id)"
                        class="btn btn-danger"
                      >Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/config/fire";
import request from "request-promise-native";

export default {
  name: "user",
  data: function () {
    return {
      users: [],
      newUser: {
        id: "new",
        name: "",
        last: "",
        email: "",
        country: "",
      },
      error: "",
      countrys: "",
      title: "Add a New User",
    };
  },
  mounted() {
    db.collection("user").onSnapshot((querySnapshot) => {
      this.users = [];
      querySnapshot.forEach((user) => {
        let data = user.data();
        data.id = user.id;
        this.users.push(data);
      });
    });
    this.appendInitial();
  },
  methods: {
    async appendInitial() {
      let options = {
        uri: `https://restcountries.eu/rest/v2/all`,
        method: "GET",
        json: true,
      };
      try {
        let result;
        result = await request(options);
        this.countrys = result.map((x) => x.name);
      } catch (e) {
        console.error("error-->", e);
        return;
      }
    },
    addUser: function () {
      for (var key in this.newUser) {
        if (this.newUser[key] == null || this.newUser[key] == "") {
          this.error = " Plz write the in field " + key;
          return false;
        }
      }

      if (this.newUser.id == "new") {
        db.collection("user")
          .add(this.newUser)
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      } else {
        db.collection("user")
          .doc(this.newUser.id)
          .set(this.newUser)
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }

      this.error = "";
      this.title = "Add a New User";
      this.newUser = {
        id: "new",
        name: "",
        last: "",
        email: "",
        country: "",
      };
    },
    deleteUser: function (index) {
      if (confirm("Are you sure delete it?")) {
        db.collection("user")
          .doc(index)
          .delete()
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      }
    },
    editUser: function (user) {
      this.title = "Edit User: " + user.name;
      this.newUser = user;
    },
    cancelEdit: function () {
      if (confirm("Are you sure cancel Edit?")) {
        this.title = "Add a New User";
        this.newUser = {
          id: "new",
          name: "",
          last: "",
          email: "",
          country: "",
        };
      }
    },
  },
};
</script>