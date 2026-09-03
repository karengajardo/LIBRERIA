<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Administrador</title>
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
    <div class="container" style="max-width: 400px; margin-top: 80px;">
        <h2 class="section-title">Panel Admin</h2>
        <form id="login-form">
            <div style="margin-bottom: 15px;">
                <label for="usuario">Usuario</label><br>
                <input type="text" id="usuario" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label for="password">Contraseña</label><br>
                <input type="password" id="password" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <button type="submit" style="width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Ingresar</button>
        </form>
    </div>

    <script src="../js/admin.js"></script>
</body>
</html>