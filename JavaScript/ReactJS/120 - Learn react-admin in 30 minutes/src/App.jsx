import {
  Admin, Resource, List, Datagrid, TextField, EmailField,
  Edit, SimpleForm, TextInput,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} />
    </Admin>
  );
}
