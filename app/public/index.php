<?php

$jsonFile = '../data/projects.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $project = [
        'title' => $_POST["title"],
        'description' => $_POST["description"],
        'stack' => $_POST["stack"],
        'contact' => $_POST["contact"]
    ];

    $jsonData = file_get_contents($jsonFile);
    $projects = json_decode($jsonData, true);
    $projects[] = $project;
    $jsonData = json_encode($project, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $jsonData);
}

$project = [[
    'title' => 'Project name',
    'description' => 'Project description',
    'stack' => 'Tech stack',
    'contact' => 'Contact name',
]];

if (!file_exists($jsonFile)) {
    echo "file does not exist, creating...";
    $jsonData = json_encode($project, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $jsonData);
}

$jsonData = file_get_contents($jsonFile);
$projects = json_decode($jsonData, true);

if (!is_array($projects)) {
    echo "No projects";
    exit;
}
?>

<html>
    <meta charset="UTF-8">
    <title>WeDev Network Projects</title>
    <meta name="description" content="WebDev network community projects">
    <link rel="stylesheet" href="style.css?v=0.2">
    <body>
        <div class="content">
            <h1>WeDev Network Projects</h1>
            <?php foreach($projects as $project) { ?>
                <div class="project">
                    <div class="project-title">
                        <div class="content"><?php echo $project['title']; ?></div>
                    </div>
                    <div class="content">
                        <div><?php echo $project['description']; ?></div>
                        <div><?php echo $project['stack']; ?></div>
                        <div><?php echo $project['contact']; ?></div>
                    </div>
                </div>
            <?php } ?>

            <h2>Add your project</h2>
            <form method="post">
                <label>Title</label>
                <input type="text" name="title">
                <label>Description</label>
                <textarea name="description"></textarea>
                <label>Tech stack</label>
                <textarea name="stack"></textarea>
                <label>Contact</label>
                <input type="tezxt" name="contact"></input>
            </form>
        </div>
    </body>
</html>
