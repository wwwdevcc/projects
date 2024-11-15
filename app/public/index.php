<?php

$jsonFile = '../data/projects.json';
$projectsLimit = 100;

// make sure the data file exists.
if (!file_exists($jsonFile)) {
    touch($jsonFile);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $project = [
        'title' => substr($_POST["title"], 0, 200),
        'description' => substr($_POST["description"], 0, 500),
        'stack' => substr($_POST["stack"], 0, 500),
        'contact' => substr($_POST["contact"], 0, 150),
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

        header('Location: /#projects');
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

        <p class="intro">
            This is a showcases of projects that are seeking collaborators. If you're a developer looking to join forces, explore the projects listed here and reach out to the contact person to get started.
        <br>
            If you have your own project or idea that you'd like to share and find collaborators for, feel free to add it here. 
            <a href="https://discord.gg/ypbQaP9e" target="_blank">Join us on Discord!</a>
        </p>

        <section class="guide">
            <div class="guide-grid">
                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>
                        <h3>Browse Projects</h3>
                        <p>Explore project ideas from our community members, including tech stacks and requirements.</p>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></span>
                        <h3>Share Your Idea</h3>
                        <p>Have a project in mind? Fill out the form below to share it with potential collaborators.</p>
                    </div>
                </div>

                <div class="guide-card">
                    <div class="guide-content">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                        <h3>Connect</h3>
                        <p>Use Discord usernames to connect with project owners and join their teams.</p>
                    </div>
                </div>
            </div>
        </section>

        <details>
            <summary>Add your project</summary>
            <form method="post">
                
                <label>Title</label>
                <input type="text" name="title" placeholder="Project name" maxlength="200" required>
                <label>Description</label>
                <textarea name="description" placeholder="Describe your project idea" maxlength="500" required></textarea>
                <label>Tech stack</label>
                <textarea name="stack" placeholder="What tech stack do you want to use?" maxlength="500" required></textarea>
                <label>Contact</label>
                <input type="text" name="contact" placeholder="Your Discord username" maxlength="150" required></input>
                <p><small>* use your Discord username</small></p>
                <input type="submit" value="Add"></input>
            </form>
        </details>

        <?php if (isset($error) && $error) { ?>
            <div>There was an error adding your project. Try again or contact us if the error persists.</div>
        <?php } ?>

        <?php if (empty($projects)) { ?>
            <div>There are no projects right now.</div>
        <?php } ?>

        <a id="projects"></a>
        <?php foreach ($projects as $project) { ?>
            <div class="project">
                <div class="project-title">
                    <div class="content"><?php echo htmlentities($project['title']); ?></div>
                </div>
                <div class="content project-details">
                    <div><strong>Description:</strong><br> <?php echo nl2br(htmlentities($project['description'])); ?></div>
                    <div><strong>Stack:</strong><br> <?php echo nl2br(htmlentities($project['stack'])); ?></div>
                    <div><strong>Contact:</strong> <?php echo htmlentities($project['contact']); ?></div>
                </div>
            </div>
        <?php } ?>
    </div>
    <footer>
        <small>WebDev Network 2024</small>
    </footer>
</body>

</html>