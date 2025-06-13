# Manual: Deploying a Secure Serverless Backend on AWS

This guide details how to create a secure backend using AWS Lambda and API Gateway. This setup protects your secret API keys by keeping them off the front-end, processing API calls securely on the server-side.

---

### Part 1: Create the AWS Lambda Function

The Lambda function stores your secret API key, holds your core logic, and communicates with the external API (e.g., Groq).

#### Step 1: Create the Lambda Function
1.  Navigate to the **AWS Lambda** console.
2.  Click **Create function**.
3.  Select **Author from scratch**.
4.  **Function name:** Give it a descriptive name (e.g., `groqApiProxy`).
5.  **Runtime:** Select a recent Node.js version (e.g., **Node.js 20.x**).
6.  **Architecture:** Keep the default `x86_64`.
7.  Click **Create function**.

#### Step 2: Add the API Key as an Environment Variable
This is the most critical security step.
1.  Inside your new function, go to the **Configuration** tab and select **Environment variables**.
2.  Click **Edit**.
3.  Click **Add environment variable**.
4.  **Key:** `GROQ_API_KEY` (or the name your code expects).
5.  **Value:** Paste your actual secret API key.
6.  Click **Save**.

#### Step 3: Prepare Your Code and Dependencies Locally
1.  On your computer, create a new folder (e.g., `my-lambda-project`).
2.  Inside this folder, place your Lambda function code file (e.g., `index.mjs`).
3.  Place any other required files, like `resumeContent.txt`, in this same folder.
4.  Open a terminal in this folder and install the necessary libraries. This will create a `node_modules` folder.
    ```bash
    npm init -y
    npm install groq-sdk
    ```

#### Step 4: Create the Deployment Package (.zip)
1.  Inside the `my-lambda-project` folder, select **all** the files and folders (`index.mjs`, `resumeContent.txt`, `node_modules`, `package.json`, etc.).
2.  Compress them into a single `.zip` file. Name it something like `deployment-package.zip`.
    * **Important:** Do not zip the parent folder itself. Zip the *contents* of the folder.

#### Step 5: Upload the .zip File to Lambda
1.  Go back to the **Code** tab in your Lambda function's page on AWS.
2.  Click the **Upload from** button and select **.zip file**.
3.  Upload the `deployment-package.zip` file you just created.
4.  Click **Save**.

---

### Part 2: Create the API Gateway Endpoint

API Gateway provides a public URL that your frontend can call to trigger the Lambda function.

#### Step 1: Create an HTTP API
1.  Navigate to the **AWS API Gateway** console.
2.  Click **Create API**.
3.  Find the **HTTP API** option and click **Build**.
4.  Click **Add integration** and select **Lambda**.
5.  Choose your Lambda function (`groqApiProxy`) from the dropdown.
6.  Give your API a name (e.g., `ResumeGroqAPI`).
7.  Click **Next**.

#### Step 2: Configure Routes
1.  **Method:** Select `POST`.
2.  **Resource path:** Enter a path, for example, `/chat`.
3.  Ensure the **Integration target** is your Lambda function.
4.  Click **Next**.

#### Step 3: Configure Stages
1.  The default stage name `$default` is fine. Ensure **Auto-deploy** is enabled.
2.  Click **Next**, then **Create**.

#### Step 4: Configure CORS
To allow your website to call the API, you must configure Cross-Origin Resource Sharing (CORS).
1.  In your newly created API, go to the **CORS** section on the left menu.
2.  Click **Configure**.
3.  **Access-Control-Allow-Origin:** Enter your exact website domain (e.g., `https://chirawat.info`). It is also wise to add `http://127.0.0.1:5500` or similar for local testing.
4.  **Access-Control-Allow-Methods:** Select `POST` and `OPTIONS`.
5.  **Access-Control-Allow-Headers:** You can use `*` (asterisk) for simplicity.
6.  Click **Save**. *Note: For HTTP APIs with auto-deploy, changes are saved and deployed automatically.*

Your backend is now deployed and ready to be called from your frontend application using the **Invoke URL** provided on your API Gateway's main page.
