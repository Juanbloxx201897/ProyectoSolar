import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class App {

    public static void main(String[] args) throws Exception {

        String url = "jdbc:mysql://localhost:3306/Energia_Solar";
        String usuario = "root";
        String clave = "";

        try {
            Connection conexion = DriverManager.getConnection(url, usuario, clave);
            System.out.println("Conexión exitosa a la base de datos");
            conexion.close();

        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos");
            e.printStackTrace();
        }
    }
}
