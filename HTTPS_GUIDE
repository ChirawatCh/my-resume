---
# Manual: How to Get HTTPS on S3 with CloudFront & ACM
---

This guide explains how to add a free SSL/TLS certificate (HTTPS) to your static website hosted on Amazon S3. We will use AWS Certificate Manager (ACM) for the certificate and Amazon CloudFront as the Content Delivery Network (CDN) to serve the site.

### Part 1: Request a Free SSL/TLS Certificate (ACM)

#### Step 1: Go to the Correct AWS Region

1. Navigate to the **AWS Certificate Manager (ACM)** console.

2. **Crucial Step:** In the top-right corner of the AWS console, change your region to **US East (N. Virginia) us-east-1**. CloudFront requires certificates to be in this specific region.

#### Step 2: Request a Public Certificate

1. Click **Request a certificate**.

2. Choose **Request a public certificate** and click **Next**.

#### Step 3: Add Your Domain Names

1. **Fully qualified domain name:** Enter your root domain (e.g., `chirawat.info`).

2. Click **Add another name to this certificate**.

3. Enter the `www` version of your domain (e.g., `www.chirawat.info`).

#### Step 4: Validate Domain Ownership

1. Select **DNS validation** as your method.

2. Click **Request**.

3. ACM will provide two `CNAME` records that you must add to your DNS provider (e.g., AWS Route 53) to prove you own the domains.

   * **In Route 53:** Go to your domain's Hosted Zone and click "Create record". For each CNAME provided by ACM, create a new `CNAME` record.

   * **Record Name:** Paste the "CNAME name" from ACM, **but remove your domain name from the end**. For example, if ACM gives you `_abc.www.chirawat.info`, you only enter `_abc.www` in the "Record name" field in Route 53.

   * **Value:** Paste the full "CNAME value" from ACM.

4. Wait for the certificate status to change from `Pending validation` to **Issued**. This can take 5-60 minutes.

### Part 2: Create and Configure a CloudFront Distribution

#### Step 1: Start the Creation Process

1. Navigate to the **Amazon CloudFront** console.

2. Click **Create a CloudFront distribution**.

#### Step 2: Configure the Origin

1. **Origin domain:** In the dropdown, select your S3 bucket.

2. **Origin access:** Choose **Origin access control settings (recommended)**.

3. Click **Create control setting**, and in the pop-up, click **Create** again.

4. A yellow banner will appear with a **Copy policy** button. Click it.

#### Step 3: Apply the S3 Bucket Policy

1. Open a new tab and go to your **S3 bucket > Permissions > Bucket policy**.

2. Click **Edit**, paste the policy you just copied, and click **Save changes**. This allows only CloudFront to access your bucket's content.

#### Step 4: Configure Viewer (User-Facing) Settings

1. Back in the CloudFront tab, set **Viewer protocol policy** to **Redirect HTTP to HTTPS**.

2. **Allowed HTTP methods:** Select **GET, HEAD, OPTIONS**.

#### Step 5: Add Domain & SSL Certificate

1. **Alternate domain names (CNAMEs):** Add both `chirawat.info` and `www.chirawat.info`.

2. **Custom SSL certificate:** From the dropdown, select the certificate you created in ACM.

#### Step 6: Set the Default Root Object

1. Find the **Default root object** field.

2. Enter `index.html`. This tells CloudFront to serve this file when someone visits the root of your domain.

#### Step 7: Create and Deploy

1. Click **Create distribution**.

2. Wait 15-20 minutes for the distribution to finish deploying. The status will change from "Deploying" to showing a "Last modified" date.

### Part 3: Final DNS Update (Route 53)

This is the final step to make your website live through CloudFront.

#### Step 1: Get Your CloudFront Domain Name

1. In the CloudFront console, find your new distribution. Copy its **Distribution domain name** (e.g., `d123abcdexample.cloudfront.net`).

#### Step 2: Update the DNS 'A' Records

1. Go to your domain's **Hosted Zone in Route 53**.

2. **For the root domain (`chirawat.info`):**

   * Find the `A` record that currently points to your S3 bucket.

   * Click **Edit record**.

   * Ensure the **Alias** switch is **ON**.

   * Change the "Route traffic to" value from "S3 website endpoint" to **Alias to CloudFront distribution**.

   * Paste your CloudFront domain name in the box.

   * Click **Save**.

3. **For the `www` domain (`www.chirawat.info`):**

   * Click **Create record**.

   * **Record name:** `www`.

   * **Record type:** `A`.

   * Turn the **Alias** switch **ON**.

   * **Route traffic to:** Choose **Alias to CloudFront distribution** and paste the same CloudFront domain name.

   * Click **Create records**.

After a few minutes for the DNS to update, your website will be live, secure, and fast at `https://chirawat.info`.