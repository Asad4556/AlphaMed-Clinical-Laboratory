<?php
// init_db.php
require_once 'config.php';

// If DB exists and you want to reset, uncomment the unlink line
// @unlink(__DIR__ . '/lab_system.db');

try {
    // Create tables
    $db->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        name TEXT,
        active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department_id INTEGER,
        code TEXT,
        name TEXT,
        unit TEXT,
        normal_range TEXT,
        parameters TEXT,
        FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        gender TEXT,
        age INTEGER,
        phone TEXT,
        mr_no TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sample_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending',
        sample_code TEXT,
        FOREIGN KEY(patient_id) REFERENCES patients(id)
    );

    CREATE TABLE IF NOT EXISTS order_tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        test_id INTEGER,
        assigned_to INTEGER,
        result TEXT,
        result_data TEXT, -- json of parameter->value
        status TEXT DEFAULT 'not_done',
        reported_at DATETIME,
        FOREIGN KEY(order_id) REFERENCES sample_orders(id),
        FOREIGN KEY(test_id) REFERENCES tests(id)
    );
    ");

    // Insert default users (admin, reception, tech)
    $hash_admin = password_hash("Asad@2723", PASSWORD_DEFAULT);
    $hash_reception = password_hash("reception123", PASSWORD_DEFAULT);
    $hash_tech = password_hash("tech123", PASSWORD_DEFAULT);

    $db->exec("INSERT OR IGNORE INTO users (username,password,role,name,active) VALUES
        ('34501-8971113-7', '$hash_admin', 'admin', 'Super Admin', 1),
        ('reception1', '$hash_reception', 'reception', 'Reception User', 1),
        ('tech1', '$hash_tech', 'technician', 'Tech User', 1)
    ;");

    // Departments list
    $departments = [
        'Hematology',
        'Serology',
        'Histopathology',
        'Microbiology',
        'Biochemistry',
        'Culture Tests',
        'Special Chemistry',
        'Molecular Biology',
        'Blood Banking'
    ];

    $insertDept = $db->prepare("INSERT OR IGNORE INTO departments (name) VALUES (:name)");
    foreach ($departments as $d) {
        $insertDept->execute([':name'=>$d]);
    }

    // Programmatically create 40 placeholder tests per department
    $getDept = $db->query("SELECT id, name FROM departments")->fetchAll(PDO::FETCH_ASSOC);
    $insertTest = $db->prepare("INSERT INTO tests (department_id, code, name, unit, normal_range, parameters)
                                VALUES (:dept, :code, :name, :unit, :normal, :params)");

    foreach ($getDept as $dept) {
        for ($i=1;$i<=40;$i++) {
            $code = strtoupper(substr($dept['name'],0,3)) . "-" . str_pad($i,2,"0",STR_PAD_LEFT);
            $tname = $dept['name'] . " Test " . str_pad($i,2,"0",STR_PAD_LEFT);
            // default unit and range — you can edit in admin later
            $unit = "";
            $normal = "";
            $params = json_encode([]);
            $insertTest->execute([
                ':dept' => $dept['id'],
                ':code' => $code,
                ':name' => $tname,
                ':unit' => $unit,
                ':normal' => $normal,
                ':params' => $params
            ]);
        }
    }

    echo "Database initialized successfully. Please delete or secure init_db.php after use.";
} catch (Exception $e) {
    die("DB Init error: " . $e->getMessage());
}
?>
