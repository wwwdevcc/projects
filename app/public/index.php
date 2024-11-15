<?php

$jsonFile = '../data/projects.json';
$projectsLimit = 100;

// make sure the data file exists.
if (!file_exists($jsonFile)) {
    touch($jsonFile);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $project = [
        'title' => $_POST["title"],
        'description' => $_POST["description"],
        'stack' => $_POST["stack"],
        'contact' => $_POST["contact"]
    ];

    $fileHandle = fopen($jsonFile, 'c+');
    if (flock($fileHandle, LOCK_EX)) { 
        $jsonData = file_get_contents($jsonFile);
        $projects = json_decode($jsonData, true);
        if (!is_array($projects)) {
            $projects = [];
        }

        array_unshift($projects, $project);

        // limit the number of projects. Older projects get discarded. 
        if(count($projects) > $projectsLimit) {
            $jsonData = array_slice($jsonData, 0, $projectsLimit);
        }

        $jsonData = json_encode($projects, JSON_PRETTY_PRINT);
        file_put_contents($jsonFile, $jsonData);

        flock($fileHandle, LOCK_UN);    

        header('Location: /');
        exit;
    }

    $error = true;
}

$jsonData = file_get_contents($jsonFile);
$projects = json_decode($jsonData, true);
if (!is_array($projects)) {
    $projects = [];
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

        <section class="guide">
            <div class="guide-grid">
                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon">👀</span>
                        <h3>Browse Projects</h3>
                        <p>Explore project ideas from our community members, including tech stacks and requirements.</p>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon">💡</span>
                        <h3>Share Your Idea</h3>
                        <p>Have a project in mind? Fill out the form below to share it with potential collaborators.</p>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon">🤝</span>
                        <h3>Connect</h3>
                        <p>Use Discord usernames to connect with project owners and join their teams.</p>
                    </div>
                </div>
            </div>
            <div class="guide-note">
                <p><strong>Note:</strong> Always use your Discord username in the contact field.</p>
            </div>
        </section>

        <h2>Add your project</h2>
        <form method="post">
            <label>Title</label>
            <input type="text" name="title" placeholder="Project name" required>
            <label>Description</label>
            <textarea name="description" placeholder="Describe your project idea" required></textarea>
            <label>Tech stack</label>
            <textarea name="stack" placeholder="What tech stack do you want to use?" required></textarea>
            <label>Contact</label>
            <input type="text" name="contact" placeholder="Your discord username" required></input>
            <input type="submit" value="Add"></input>
        </form>

        <?php if (isset($error) && $error) { ?>
            <div>There was an error adding your project. Try again or contact us if the error persists.</div>
        <?php } ?>

        <?php if (empty($projects)) { ?>
            <div>There are no projects right now.</div>
        <?php } ?>

        <?php foreach ($projects as $project) { ?>
            <div class="project">
                <div class="project-title">
                    <div class="content"><?php echo htmlentities($project['title']); ?></div>
                </div>
                <div class="content">
                    <div><strong>Description:</strong> <?php echo htmlentities(nl2br($project['description'])); ?></div>
                    <div><strong>Stack:</strong> <?php echo htmlentities(nl2br($project['stack'])); ?></div>
                    <div><strong>Contact:</strong> <?php echo htmlentities($project['contact']); ?></div>
                </div>
            </div>
        <?php } ?>
    </div>
</body>

</html>