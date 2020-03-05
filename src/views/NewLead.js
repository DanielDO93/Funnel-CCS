import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form
} from "reactstrap";
import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-loader-spinner";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

class NewLead extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  handleChange(e) {
    if (e.target.id === "categoria") {
      if (e.target.value === "A") {
        this.setState({ descCategoria: "Más de 20 Estaciones" });
      } else if (e.target.value === "B") {
        this.setState({ descCategoria: "Entre 5 y 19 Estaciones" });
      } else if (e.target.value === "C") {
        this.setState({ descCategoria: "Menos de 5 Estaciones" });
      } else {
        this.setState({ descCategoria: "" });
      }
    }

    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });
    this.API_CCS.newLead(this.state)
      .then(res => {
        if (res.sucess === true) {
          
          MySwal.fire({
            title: "Correcto",
            text: "¡Lead Capturado Correctamente!",
            type: "success",
            confirmButtonColor: "#C00327",
            allowOutsideClick: false
          });

          this.setState({ isSaving: false });
          this.formRef.current.reset();
        } else {
          MySwal.fire({
            title: "Error",
            text:
              "Ocurrio un error al guardar el registro, por favor intenta de nuevo",
            type: "error",
            confirmButtonColor: "#C00327",
            allowOutsideClick: true
          });
          this.setState({ isSaving: false });
        }
      })
      .catch(err => console.log("ERROR"));
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      nombre_prospecto: "",
      nombre_contacto: "",
      telefono: "",
      email: "",
      categoria: "",
      primer_contacto: "",
      estado: "",
      medio: "",
      status_comercial_externo: "",
      estaciones: 0,
      status_gestion: "",
      status_venta: "",
      unidad_negocio: "",
      costo_hora: 0,
      ext: "",
      id_user: this.Auth.getProfile().id_ccs
    };
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height="70" width="70" />{" "}
          </div>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Card>
            <CardHeader className="text-center">Nuevo Lead</CardHeader>

            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={this.handleFormSubmit}
                innerRef={this.formRef}
              >
                <Row>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Nombre Prospecto</Label>
                      <Input
                        type="text"
                        placeholder="Nombre Prospecto"
                        required
                        onChange={this.handleChange}
                        id="nombre_prospecto"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Nombre Contacto</Label>
                      <Input
                        type="text"
                        placeholder="Nombre Contacto"
                        required
                        onChange={this.handleChange}
                        id="nombre_contacto"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-4">
                    <FormGroup>
                      <Label htmlFor="prospecto">Telefono</Label>
                      <Input
                        type="text"
                        pattern="[0-9]{3}-[0-9]{7}"
                        placeholder="555-5555555"
                        required
                        onChange={this.handleChange}
                        id="telefono"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-2">
                    <FormGroup>
                      <Label htmlFor="prospecto">Extension</Label>
                      <Input
                        type="text"
                        placeholder="Ext"
                        onChange={this.handleChange}
                        id="ext"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Email</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={this.handleChange}
                        id="email"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-3">
                    <FormGroup>
                      <Label htmlFor="prospecto">Categoría</Label>
                      <Input
                        type="select"
                        placeholder="Categoría"
                        required
                        onChange={this.handleChange}
                        id="categoria"
                      >
                        <option value="">-Selecciona-</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-3">
                    <FormGroup>
                      <Label htmlFor="prospecto">Descripción</Label>
                      <Input
                        type="text"
                        placeholder="Descripción"
                        onChange={this.handleChange}
                        id="descripcion"
                        value={this.state.descCategoria}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Fecha Contacto</Label>
                      <Input
                        type="date"
                        placeholder="Fecha Contacto"
                        required
                        onChange={this.handleChange}
                        id="primer_contacto"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Estado</Label>
                      <Input
                        type="select"
                        placeholder="Estado"
                        required
                        onChange={this.handleChange}
                        id="estado"
                      >
                        <option value="">-Selecciona-</option>
                        <option>Aguascalientes</option>
                        <option>Baja California</option>
                        <option>Baja California Sur</option>
                        <option>Campeche</option>
                        <option>Coahuila de Zaragoza</option>
                        <option>Colima</option>
                        <option>Chiapas</option>
                        <option>Chihuahua</option>
                        <option>CDMX</option>
                        <option>Durango</option>
                        <option>Guanajuato</option>
                        <option>Guerrero</option>
                        <option>Hidalgo</option>
                        <option>Jalisco</option>
                        <option>México</option>
                        <option>Michoacán de Ocampo</option>
                        <option>Morelos</option>
                        <option>Nayarit</option>
                        <option>Nuevo León</option>
                        <option>Oaxaca</option>
                        <option>Puebla</option>
                        <option>Querétaro</option>
                        <option>Quintana Roo</option>
                        <option>San Luis Potosí</option>
                        <option>Sinaloa</option>
                        <option>Sonora</option>
                        <option>Tabasco</option>
                        <option>Tamaulipas</option>
                        <option>Tlaxcala</option>
                        <option>Veracruz de Ignacio de la Llave</option>
                        <option>Yucatán</option>
                        <option>Zacatecas</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Medio</Label>
                      <Input
                        type="select"
                        placeholder="Enter your name"
                        required
                        onChange={this.handleChange}
                        id="medio"
                      >
                        <option value="">-Selecciona-</option>
                        <option>Página CCS</option>
                        <option>Llamada IN</option>
                        <option>Referido</option>
                        <option>Licitacion</option>
                        <option>Llamada OUT</option>
                        <option>Recomendado de Jero</option>
                        <option>Recomendado de Vivian</option>
                        <option>Correo</option>
                        <option>Chat</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">
                        Estatus Comercial Externo
                      </Label>
                      <Input
                        type="select"
                        placeholder="Enter your name"
                        required
                        onChange={this.handleChange}
                        id="status_comercial_externo"
                      >
                        <option value="">-Selecciona-</option>
                        <option>Operando</option>
                        <option>Por Implementar</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Estaciones</Label>
                      <Input
                        type="number"
                        min="0"
                        max="1000"
                        placeholder="Número de Estaciones"
                        required
                        onChange={this.handleChange}
                        id="estaciones"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Unidad de Negocio</Label>
                      <Input
                        type="select"
                        placeholder="Enter your name"
                        required
                        onChange={this.handleChange}
                        id="unidad_negocio"
                      >
                        <option value="">-Selecciona-</option>
                        <option>Outsourcing</option>
                        <option>Cosourcing</option>
                        <option>Consultoría</option>
                        <option>Calidad</option>
                        <option>Capacitación</option>
                        <option>BI</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Costo por Hora</Label>
                      <Input
                        type="number"
                        min="0"
                        max="10000000"
                        placeholder="Costo por Hora (Pesos)"
                        required
                        onChange={this.handleChange}
                        id="costo_hora"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Estatus de Gestión</Label>
                      <Input
                        type="select"
                        placeholder="Enter your name"
                        required
                        onChange={this.handleChange}
                        id="status_gestion"
                      >
                        <option value="">-Selecciona-</option>
                        <option>Primer Contacto</option>
                        <option>Envio de Propuesta</option>
                        <option>Rebote de Propuesta</option>
                        <option>Por Firmar</option>
                        <option>Cerrada</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="col-sm-6">
                    <FormGroup>
                      <Label htmlFor="prospecto">Estatus de Venta</Label>
                      <Input
                        type="select"
                        placeholder="Enter your name"
                        required
                        onChange={this.handleChange}
                        id="status_venta"
                      >
                        <option value="">-Selecciona-</option>
                        <option>En Proceso</option>
                        <option>Por Firmar</option>
                        <option>Firmado</option>
                        <option>No Contcretado</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
}

export default withAuth(NewLead);
