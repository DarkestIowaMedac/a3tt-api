import { DataSource } from "typeorm"

const testConnection = async () => {
  console.log("🔍 Probando conexión a Oracle...")

  const dataSource = new DataSource({
    type: "oracle",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 1521,
    username: process.env.DB_USERNAME || "A3TT",
    password: process.env.DB_PASSWORD || "A3TTsatel",
    sid: process.env.DB_SID || "XE",
    logging: true,
    // ✅ Configuración mínima para test
    entities: [],
    synchronize: false,
  })

  try {
    await dataSource.initialize()
    console.log("✅ Conexión exitosa a Oracle Database")

    // Test query simple
    const result = await dataSource.query("SELECT 1 FROM DUAL")
    console.log("📊 Query test result:", result)

    await dataSource.destroy()
    console.log("🔒 Conexión cerrada correctamente")
  } catch (error) {
    console.error("❌ Error de conexión:", error.message)
    console.error("🔧 Verifica que Oracle esté corriendo y las credenciales sean correctas")
  }
}

testConnection()
