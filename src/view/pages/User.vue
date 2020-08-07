<template>
  <div id="app">
    <!-- NAVIGATION -->
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">VuejsFirebase</a>
    </nav>
    <!-- MAIN CONTENT -->
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <h3>Add a New User</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="addUser">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newUser.name" placeholder="Name" />
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newUser.last" placeholder="Last Name" />
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" v-model="newUser.email" placeholder="Email" />
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newUser.country" placeholder="Country" />
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
            <div class="alert alert-danger" role="alert" v-if="error">
              {{ error }}
            </div>
          </div>
        </div>
        <div class="col-sm-8 text-center">
          <!--<img src="./assets/logo.png" alt="">-->
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
                    <td>
                      {{user.nombres}}
                    </td>
                    <td>
                      {{user.apellidos}}
                    </td>
                    <td>
                      {{user.email}}
                    </td>
                    <td>
                      {{user.pais}}
                    </td>
                    <td>
                      <button @click="deleteUser(index)" class="btn btn-danger">
                        Delete
                      </button>
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
//import firebase from "firebase";

export default {
  name: "user",
  data: function () {
    return {
      users: [],
      newUser: {
        name: '',
        last: '',
        email: '',
        country: ''
      },
      error:''
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
  },
  methods: {
    addUser: function () {
      for (var key in this.newUser) {
        if (this.newUser[key] == null || this.newUser[key] == ""){
          this.error = " Plz write the in field "+key;
          return false;
        }  
    }

    this.error = '';

     console.log("this.newUsepasooooooor--->>>>",this.newUser);
    

      /*
      let horarioActual = new Date().getHours() + ":" + new Date().getMinutes();
      let mensajeNuevo = {
        horario: horarioActual,
        contenido: this.contenidoEnviar,
        asesor: true,
        bot: false,
      };
      // this.conversas[this.indiceActivo].mensajes.push(mensajeNuevo);
      let docRef = db
        .collection("chats")
        .doc(this.conversas[this.indiceActivo].id);

      docRef.update({
        mensajes: firebase.firestore.FieldValue.arrayUnion(mensajeNuevo),
      });

      /*
        docRef.set({
          mensajes:this.conversas[this.indiceActivo].mensajes},
          { merge: true }
        );
        */
     // this.contenidoEnviar = "";
    },
    asignaChat: function (indice, id) {
      this.indiceActivo = indice;
      let docRef = db.collection("chats").doc(id);
      let email = this.email;
      let asesor = this.usuario;

      docRef
        .get()
        .then(function (doc) {
          if (doc.data().correo_asesor.length == 0) {
            docRef.update({
              correo_asesor: email,
              nombre_asesor: asesor,
            });
            /*
            docRef.set(
              {
                correo_asesor: email,
                nombre_asesor: asesor,
              },
              { merge: true }
            );
            */
          }
        })
        .catch(function (error) {
          console.log("Error en la asignacion-->>", error);
        });
    },
    deleteUser: function (index) {
      if(confirm('Are you sure delete it?')) {
        console.log("eliminado-->", index);
      }
    }
  },
};
</script>