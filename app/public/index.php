<?php include "header.php" ?>
<?php
$usersFile = '../data/users.json';
$projectsFile = '../data/projects.json';
$projectsLimit = 100;

// make sure the projects file exists.
if (!file_exists($projectsFile)) {
    touch($projectsFile);
}

// make sure the users file exists.
if (!file_exists($usersFile)) {
    touch($usersFile);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Redirect back home if honeypot field is checked.
    if(isset($_POST['hp'])) {
        header('Location: /');
        exit;
    }

    $project = [
        'title' => substr($_POST["title"], 0, 200),
        'description' => substr($_POST["description"], 0, 500),
        'stack' => substr($_POST["stack"], 0, 500),
        'contact' => substr($_POST["contact"], 0, 150),
        'url' => substr($_POST["url"], 0, 500),
    ];

    $fileHandle = fopen($projectsFile, 'c+');
    if (flock($fileHandle, LOCK_EX)) { 
        $jsonData = file_get_contents($projectsFile);
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
        file_put_contents($projectsFile, $jsonData);

        flock($fileHandle, LOCK_UN);    

        header('Location: /#projects');
        exit;
    }

    $error = true;
}

$jsonData = file_get_contents($projectsFile);
$projects = json_decode($jsonData, true);
if (!is_array($projects)) {
    $projects = [];
}
?>


    <div class="content">
        <div class="theme-control">
            <h1>Projects Board</h1>
        </div>
        <div class="intro">
            <p>
                This is a showcase of projects that are seeking collaborators. If you're a developer looking to join forces, explore the projects listed here and reach out to the contact person to get started.
            </p><p>
                If you have your own project or idea that you'd like to share and find collaborators for, feel free to add it here. 
            </p>
        </div>

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
                        <a href="https://discord.gg/KJFGcyYVwN" target="_blank">Join us on Discord!</a>
                    </div>
                </div>
            </div>
        </section>

        <?php
        // Requiring login to add projects.
        require_once "../src/auth/Auth.php";
        $auth = new Auth("../data/users.json");
        if ($auth->isAuthenticated()):
        ?>
        <details>
            <summary>Add your project</summary>
            <form method="post">
                <label>Title</label>
                <input type="text" name="title" placeholder="Project name" maxlength="200" required></input>
                <label>Description</label>
                <textarea name="description" placeholder="Describe your project idea" maxlength="500" required></textarea>
                <label>Tech stack</label>
                <textarea name="stack" placeholder="What tech stack do you want to use?" maxlength="500" required></textarea>
                <label>URL <small>(optional)</small></label>
                <input type="url" name="url" placeholder="URL to your project" maxlength="500"></input>
                <label>Contact</label>
                <input type="text" name="contact" placeholder="Your Discord username" maxlength="150" required></input>
                <p><small>* use your Discord username</small></p>
                <input type="checkbox" class="hidden" name="hp" value=1></input>
                <input type="submit" value="Add"></input>
            </form>
        </details>
        <?php else: ?>
        <div class="please-login">
            <p>Please Login to add a project.</p>
            <a href="/login.php">Login</a>
        </div>
        <?php endif; ?>

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
                    <div><strong>URL:</strong> <?php echo htmlentities($project['url']); ?></div>
                </div>
            </div>
        <?php } ?>
    </div>
    <footer>
        <p>
            <a href="https://github.com/wwwdevcc/projects" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
        </p>
        <small>wwwdev.cc 2024</small>
    </footer>

<?php include "footer.php" ?>