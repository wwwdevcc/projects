<?php

# TODO:
# - style form
# - make input fields mandatory (html validation is fine, no need js)
# - improve style
# - add information text so users know what is this and how to use it
# - check for errors when writing to the json file
# - repopulate the form with the data and display error if could not save data
# - improve the README file

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
    $jsonData = json_encode($projects, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $jsonData);
    header('Location: /');
    exit;
}

// Add a project if the data file does not exist for testing
if (!file_exists($jsonFile)) {
    $project = [[
        'title' => 'Project name',
        'description' => 'Project description',
        'stack' => 'Tech stack',
        'contact' => 'Contact name',
    ]];
    
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

             <p class="intro">Share your project ideas and find collaborators in our discord community! Whether you're looking to build something new or join an existing project, this is the place to connect.</p>
          
            <h2>Add your project</h2>
            <form method="post">
                <label>Title</label>
                <input type="text" name="title" placeholder="Project name">
                <label>Description</label>
                <textarea name="description" placeholder="Describe your project idea"></textarea>
                <label>Tech stack</label>
                <textarea name="stack" placeholder="What tech stack do you want to use?"></textarea>
                <label>Contact</label>
                <input type="text" name="contact" placeholder="Your discord username"></input>
                <input type="submit" value="Add"></input>
            </form>

              <?php foreach($projects as $project) { ?>
                <div class="project">
                    <div class="project-title">
                        <div class="content"><?php echo $project['title']; ?></div>
                    </div>
                    <div class="content">
                        <div><strong>Description:</strong> <?php echo nl2br($project['description']); ?></div>
                        <div><strong>Stack:</strong> <?php echo nl2br($project['stack']); ?></div>
                        <div><strong>Contact:</strong> <?php echo $project['contact']; ?></div>
                    </div>
                </div>
            <?php } ?>
        </div>
    </body>
</html>
