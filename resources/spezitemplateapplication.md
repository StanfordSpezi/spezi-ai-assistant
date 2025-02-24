This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    beta-deployment.yml
    build-and-test.yml
    documentation-deployment.yml
    monthly-markdown-link-check.yml.yml
    static-analysis.yml
.reuse/
  dep5
fastlane/
  .gitignore
  Appfile
  Fastfile
  README.md
  README.md.license
LICENSES/
  MIT.txt
Scripts/
  create.sh
  setup.sh
  TEMPLATEREADME.md
TemplateApplication/
  Account/
    AccountButton.swift
    AccountSetupHeader.swift
    AccountSheet.swift
  Contacts/
    Contacts.swift
  Firestore/
    FirebaseConfiguration.swift
  Onboarding/
    AccountOnboarding.swift
    Consent.swift
    HealthKitPermissions.swift
    InterestingModules.swift
    NotificationPermissions.swift
    OnboardingFlow.swift
    Welcome.swift
  Resources/
    Assets.xcassets/
      AccentColor.colorset/
        Contents.json
        Contents.json.license
      AppIcon.appiconset/
        Contents.json
        Contents.json.license
      Contents.json
      Contents.json.license
    ConsentDocument.md
    ConsentDocument.md.license
    Localizable.xcstrings
    Localizable.xcstrings.license
    SocialSupportQuestionnaire.json
    SocialSupportQuestionnaire.json.license
  Schedule/
    Bundle+Questionnaire.swift
    EventView.swift
    ScheduleView.swift
    TemplateApplicationScheduler.swift
  SharedContext/
    FeatureFlags.swift
    StorageKeys.swift
  Supporting Files/
    TemplateApplication.docc/
      Create.md
      Modify.md
      Setup.md
      TemplateApplication.md
    GoogleService-Info.plist
    GoogleService-Info.plist.license
    Info.plist
    Info.plist.license
    TemplateApplication.entitlements
    TemplateApplication.entitlements.license
  HomeView.swift
  TemplateApplication.swift
  TemplateApplicationDelegate.swift
  TemplateApplicationStandard.swift
  TemplateApplicationTestingSetup.swift
TemplateApplication.xcodeproj/
  project.xcworkspace/
    xcshareddata/
      swiftpm/
        Package.resolved
      IDEWorkspaceChecks.plist
    contents.xcworkspacedata
  xcshareddata/
    xcschemes/
      TemplateApplication.xcscheme
  project.pbxproj
TemplateApplicationTests/
  TemplateApplicationTests.swift
TemplateApplicationUITests/
  ContactsTests.swift
  ContributionsTest.swift
  OnboardingTests.swift
  SchedulerTests.swift
.firebaserc
.gitignore
.linkspector.yml
.periphery.yml
.swiftlint.yml
CITATION.cff
codecov.yml
CONTRIBUTORS.md
firebase.json
firebasestorage.rules
firestore.rules
LICENSE.md
README.md
TemplateApplication.xctestplan

================================================================
Files
================================================================

================
File: .github/workflows/beta-deployment.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

name: Beta Deployment

on:
  push:
    branches:
      - main
  workflow_dispatch:

concurrency:
  group: Beta-Deployment
  cancel-in-progress: false

jobs:
  buildandtest:
    name: Build and Test
    uses: ./.github/workflows/build-and-test.yml
    permissions:
      contents: read
    secrets: inherit
  staticanaylsis:
    name: Static Analysis
    uses: ./.github/workflows/static-analysis.yml
    permissions:
      security-events: write
      actions: read
      contents: read
    secrets: inherit
  iosapptestflightdeployment:
    name: iOS App TestFlight Deployment
    needs: buildandtest
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    permissions:
      contents: read
    with:
      googleserviceinfoplistpath: 'TemplateApplication/Supporting Files/GoogleService-Info.plist'
      setupsigning: true
      fastlanelane: beta
    secrets: inherit
  deployfirebase:
    name: Deploy Firebase Project
    needs: iosapptestflightdeployment
    uses: StanfordBDHG/.github/.github/workflows/firebase-deploy.yml@v2
    permissions:
      contents: read
    with:
      arguments: '--debug'
    secrets:
      GOOGLE_APPLICATION_CREDENTIALS_BASE64: ${{ secrets.GOOGLE_APPLICATION_CREDENTIALS_BASE64 }}

================
File: .github/workflows/build-and-test.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

name: Build and Test

on:
  pull_request:
  workflow_dispatch:
  workflow_call:

concurrency:
  group: Build-and-Test-${{ github.ref }}
  cancel-in-progress: true

jobs:
  buildandtest:
    name: Build and Test
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    permissions:
      contents: read
    with:
      artifactname: TemplateApplication.xcresult
      runsonlabels: '["macOS", "self-hosted"]'
      setupfirebaseemulator: true
      customcommand: "firebase emulators:exec 'fastlane test'"
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: buildandtest
    uses: StanfordBDHG/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    permissions:
      contents: read
    with:
      coveragereports: TemplateApplication.xcresult
    secrets:
      token: ${{ secrets.CODECOV_TOKEN }}

================
File: .github/workflows/documentation-deployment.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Documentation Deployment

on:
  push:
    branches:
      - main
  pull_request:
  workflow_dispatch:

concurrency:
  group: Documentation-Deployment-${{ github.ref }}
  cancel-in-progress: true

jobs:
  docs:
    name: Documentation Deployment
    uses: StanfordBDHG/.github/.github/workflows/docc-github-pages.yml@v2
    permissions:
      contents: read
      pages: write
      id-token: write
    with:
      scheme: 'TemplateApplication'
      dryrun: ${{ github.ref_name != 'main' }}
      xcodeversion: "16.1" # Temporary workaround for: https://github.com/actions/runner-images/issues/11335. Remove when resolved.

================
File: .github/workflows/monthly-markdown-link-check.yml.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Monthly Markdown Link Check

on:
  # Runs at midnight on the first of every month
  schedule:
    - cron: "0 0 1 * *"

jobs:
  markdown_link_check:
    name: Markdown Link Check
    uses: StanfordBDHG/.github/.github/workflows/markdown-link-check.yml@v2
    permissions:
      contents: read

================
File: .github/workflows/static-analysis.yml
================
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Static Analysis

on:
  pull_request:
  workflow_dispatch:
  workflow_call:

concurrency:
  group: Static-Analysis-${{ github.ref }}
  cancel-in-progress: true

jobs:
  reuse_action:
    name: REUSE Compliance Check
    uses: StanfordBDHG/.github/.github/workflows/reuse.yml@v2
    permissions:
      contents: read
  swiftlint:
    name: SwiftLint
    uses: StanfordBDHG/.github/.github/workflows/swiftlint.yml@v2
    permissions:
      contents: read
  periphery:
    name: Periphery
    uses: StanfordSpezi/.github/.github/workflows/periphery.yml@v2
    permissions:
      contents: read
    with:
      runsonlabels: '["macOS", "self-hosted"]'
  markdownlinkcheck:
    name: Markdown Link Check
    uses: StanfordBDHG/.github/.github/workflows/markdown-link-check.yml@v2
    permissions:
      contents: read
  codeql:
    name: CodeQL
    uses: StanfordBDHG/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    permissions:
      security-events: write
      actions: read
      contents: read
    with:
      codeql: true
      fastlanelane: codeql
      xcodeversion: "16.1" # Temporary workaround for: https://github.com/actions/runner-images/issues/11335. Remove when resolved.

================
File: .reuse/dep5
================
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/

Files: TemplateApplication.xcodeproj/*
Copyright: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
License: MIT
Comment: All Xcode Project Configuration Files are part of the Stanford Spezi Template Application open-source project.

================
File: fastlane/.gitignore
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

test_output
report.xml
screenshots

================
File: fastlane/Appfile
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

# For more information about the Appfile, see:
#     https://docs.fastlane.tools/advanced/#appfile

app_identifier "edu.stanford.spezi.templateapplication" # The bundle identifier of your app
apple_id ENV["APPLE_ID"]  # Your Apple email address

================
File: fastlane/Fastfile
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

default_platform(:ios)

platform :ios do
  before_all do
    ENV["FASTLANE_XCODEBUILD_SETTINGS_TIMEOUT"] = "10"
    ENV["FASTLANE_XCODEBUILD_SETTINGS_RETRIES"] = "6"
  end

  desc "Build and test"
  lane :test do
    run_tests(
      skip_build: true,
      derived_data_path: ".derivedData",
      code_coverage: true,
      devices: ["iPhone 16 Pro"],
      disable_slide_to_type: false,
      concurrent_workers: 1,
      max_concurrent_simulators: 1,
      result_bundle: true,
      output_directory: ".",
      xcargs: [
        "-skipPackagePluginValidation",
        "-skipMacroValidation"
      ]
    )
  end

  desc "CodeQL"
  lane :codeql do
    ENV["FASTLANE_XCODEBUILD_SETTINGS_TIMEOUT"] = "320" # CodeQL runs on GitHub CI. We need much higher timeout here.
    build_app(
      skip_archive: true,
      skip_codesigning: true,
      derived_data_path: ".derivedData",
      xcargs: [
        "-skipPackagePluginValidation",
        "-skipMacroValidation"
      ]
    )
  end

  desc "Build app"
  lane :build do
    build_app(
      derived_data_path: ".derivedData",
      xcargs: [
        "-skipPackagePluginValidation",
        "-skipMacroValidation"
      ],
      export_options: {
        provisioningProfiles: {
          "edu.stanford.spezi.templateapplication" => "Spezi Template Application"
        }
      }
    )
  end

  desc "Sign in to the App Store Connect API"
  lane :signin do
    app_store_connect_api_key(
      key_id: ENV["APP_STORE_CONNECT_API_KEY_ID"],
      issuer_id: ENV["APP_STORE_CONNECT_ISSUER_ID"],
      key_content: ENV["APP_STORE_CONNECT_API_KEY_BASE64"],
      is_key_content_base64: true
    )
  end

  desc "Publish a beta release to internal TestFlight testers"
  lane :beta do
    signin
    increment_build_number(
      {
        build_number: latest_testflight_build_number + 1
      }
    )
    build
    commit = last_git_commit
    upload_to_testflight(
      distribute_external: true,
      groups: [
        "External Testers"
      ],
      submit_beta_review: true,
      notify_external_testers: true,
      expire_previous_builds: true,
      changelog: commit[:message]
    )
  end
end

================
File: fastlane/README.md
================
fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios test

```sh
[bundle exec] fastlane ios test
```

Build and test

### ios codeql

```sh
[bundle exec] fastlane ios codeql
```

CodeQL

### ios build

```sh
[bundle exec] fastlane ios build
```

Build app

### ios signin

```sh
[bundle exec] fastlane ios signin
```

Sign in to the App Store Connect API

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Publish a beta release to internal TestFlight testers

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

================
File: fastlane/README.md.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: LICENSES/MIT.txt
================
MIT License

Copyright (c) 2023 Stanford University

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: Scripts/create.sh
================
#!/bin/bash
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

export LC_CTYPE=UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8


# Function to display an error message, show the help, and exit
error_exit_help() {
    echo "Error: $1" >&2
    show_help
    exit 1
}

# Function to display help message
show_help() {
    echo "Usage: $0 --name <appName> --bundleIdentifier <bundleIdentifier> [--provisioningProfile <provisioningProfileName>] [--firebaseProject <firebaseProjectId>]"
    echo
    echo "Options:"
    echo "  --name                Name of the application. (required)"
    echo "  --bundleIdentifier    The iOS bundle identifier of the application. (required)"
    echo "  --provisioningProfile The name of the iOS provisioning profile to build the application. (optional, defaults to the value of --name)"
    echo "  --firebaseProject     The Firebase project identifier. (optional, defaults to the value of --name lowercased without spaces)"
    echo "  --help                Display this help and exit."
}

# Initialize variables
appName=""
bundleIdentifier=""
provisioningProfile=""

# Parse named arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --name)
            appName="$2"
            shift # past argument
            shift # past value
            ;;
        --bundleIdentifier)
            bundleIdentifier="$2"
            shift # past argument
            shift # past value
            ;;
        --provisioningProfile)
            provisioningProfile="$2"
            shift # past argument
            shift # past value
            ;;
        --firebaseProject)
            firebaseProject="$2"
            shift # past argument
            shift # past value
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            error_exit_help "Unknown option: $1"
            ;;
    esac
done

# Check for required arguments
if [ -z "$appName" ]; then
    error_exit_help "The --name argument is required."
fi

if [ -z "$bundleIdentifier" ]; then
    error_exit_help "The --bundleIdentifier argument is required."
fi

# Remove spaces from appName
appNameNoSpaces="${appName// /}"

# Convert appName to lowercase and remove spaces
appNameLowerNoSpaces=$(echo "$appName" | tr '[:upper:]' '[:lower:]' | tr -d ' ')

# Set default value for provisioningProfile & firebaseProject if not provided
if [ -z "$provisioningProfile" ]; then
    provisioningProfile="$appName"
fi

if [ -z "$firebaseProject" ]; then
    firebaseProject="$appNameLowerNoSpaces"
fi

# Testing the input:
echo "Application Name: $appName"
echo "Bundle Identifier: $bundleIdentifier"
echo "Provisioning Profile: $provisioningProfile"
echo "Application Name (No Spaces): $appNameNoSpaces"
echo "Application Name (Lowercase, No Spaces): $appNameLowerNoSpaces"

# Rename the bundle identifier:
oldBundleIdentifierEscaped=$(sed 's:/:\\/:g' <<< "edu.stanford.spezi.templateapplication")
bundleIdentifierEscaped=$(sed 's:/:\\/:g' <<< "$bundleIdentifier")

find . -type f -not \( -path '*/.git/*' \) -not \( -path '*/Scripts/create.sh' \) -exec grep -Iq . {} \; -print | while read -r file; do
    sed -i '' "s/${oldBundleIdentifierEscaped}/${bundleIdentifierEscaped}/g" "$file" || echo "Failed to process $file"
done


# Rename the provisioning profile:
oldProvisioningProfileEscaped=$(sed 's:/:\\/:g' <<< "\"Spezi Template Application\"")
provisioningProfileEscaped=$(sed 's:/:\\/:g' <<< "\"$provisioningProfile\"")

sed -i '' "s/${oldProvisioningProfileEscaped}/${provisioningProfileEscaped}/g" "./fastlane/Fastfile"
sed -i '' "s/${oldProvisioningProfileEscaped}/${provisioningProfileEscaped}/g" "./TemplateApplication.xcodeproj/project.pbxproj"


# Firebase project name:
firebaseProjectNameEscaped=$(sed 's:/:\\/:g' <<< "stanfordspezitemplateapp")
firebaseProjectEscaped=$(sed 's:/:\\/:g' <<< "$firebaseProject")

sed -i '' "s/${firebaseProjectNameEscaped}/${firebaseProjectEscaped}/g" ".firebaserc"
sed -i '' "s/${firebaseProjectNameEscaped}/${firebaseProjectEscaped}/g" "./TemplateApplication/Supporting Files/GoogleService-Info.plist"


# Rename project and code:
projectNameLowercaseEscaped=$(sed 's:/:\\/:g' <<< "templateapplication")
headerFileEscaped=$(sed 's:/:\\/:g' <<< "Stanford Spezi Template Application open-source")
projectNameNoSpacesEscaped=$(sed 's:/:\\/:g' <<< "TemplateApplication")
projectNameSpeziEscaped=$(sed 's:/:\\/:g' <<< "Spezi Template Application")
projectNameEscaped=$(sed 's:/:\\/:g' <<< "Template Application")
templateEscaped=$(sed 's:/:\\/:g' <<< "Template")
sstaEscaped=$(sed 's:/:\\/:g' <<< "{{SSTA}}")
taEscaped=$(sed 's:/:\\/:g' <<< "{{TA}}")

sstaFullEscaped=$(sed 's:/:\\/:g' <<< "Stanford Spezi Template Application")
taFullEscaped=$(sed 's:/:\\/:g' <<< "TemplateApplication")
newHeaderFileEscaped=$(sed 's:/:\\/:g' <<< "$appName based on the $sstaEscaped")
appNameEscaped=$(sed 's:/:\\/:g' <<< "$appName")
appNameNoSpacesEscaped=$(sed 's:/:\\/:g' <<< "$appNameNoSpaces")
appNameLowerNoSpacesEscaped=$(sed 's:/:\\/:g' <<< "$firebaseProject")

find . -type f -not \( -path '*/.git/*' \) -not \( -path '*/Scripts/create.sh' \) -exec grep -Iq . {} \; -print | while read -r file; do
    sed -i '' "s/${projectNameLowercaseEscaped}/${appNameLowerNoSpacesEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${headerFileEscaped}/${newHeaderFileEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${projectNameNoSpacesEscaped}/${appNameNoSpacesEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${projectNameSpeziEscaped}/${appNameEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${projectNameEscaped}/${appNameEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${templateEscaped}/${appNameNoSpacesEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${sstaEscaped}/${sstaFullEscaped}/g" "$file" || echo "Failed to process $file"
    sed -i '' "s/${taEscaped}/${taFullEscaped}/g" "$file" || echo "Failed to process $file"
done

# Remove the repo link and DOI from the citation file:
# Specify the file name
citationFile="CITATION.cff"
total_lines=$(wc -l < "$citationFile")
lines_to_keep=$((total_lines - 2))

# Check if the file has more than 3 lines
if [ "$lines_to_keep" -ge 1 ]; then
    # Output the first N lines to a temporary file
    head -n "$lines_to_keep" "$citationFile" > ".$citationFile"
    # Replace the original file with the temporary file
    mv ".$citationFile" "$citationFile"
else
    echo "$citationFile has less than 3 lines, nothing will be removed."
fi


# Rename files and directories
# Function to recursively rename directories
rename_directories() {
    base_dir=$1
    find "$base_dir" -depth -type d -name "*${projectNameNoSpacesEscaped}*" | while read -r dir; do
        new_dir=$(echo "$dir" | sed "s/${projectNameNoSpacesEscaped}/${appNameNoSpacesEscaped}/g")
        mv "$dir" "$new_dir"
        # Prevent reprocessing of already renamed directories
        rename_directories "$new_dir"
    done
}

# Rename directories
rename_directories "."

# Rename files
find . -type f -name "*${projectNameNoSpacesEscaped}*" | while read -r file; do
    new_file=$(echo "$file" | sed "s/${projectNameNoSpacesEscaped}/${appNameNoSpacesEscaped}/g")
    # Check if the new file path's directory exists before moving
    new_dir=$(dirname "$new_file")
    if [ -d "$new_dir" ]; then
        mv "$file" "$new_file"
    fi
done

# Remove the DocC documentation, Figures, and replace the README with a placeholder README
rm -rf "./${appNameNoSpacesEscaped}/Supporting Files/${appNameNoSpacesEscaped}.docc"
mv "./Scripts/TEMPLATEREADME.md" "./README.md"

rm -f ".linkspector.yml"
rm -rf "./Scripts"
rm -f "./.github/workflows/documentation-deployment.yml"

================
File: Scripts/setup.sh
================
#!/bin/s
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

# Script to document and automate the installation of software needed for the Spezi Template Application
#
# It is required that Xcode is installed on the macOS instance.

# 1. Install homebrew
export NONINTERACTIVE=1
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"


# 2. Install tools
brew install java
sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc

brew install node
brew install firebase-cli
brew install fastlane
# Set the local correctly to work with fastlane
echo 'export LC_ALL=en_US.UTF-8' >> ~/.zshrc
echo 'export LANG=en_US.UTF-8' >> ~/.zshrc

brew install git-lfs
git lfs install
git lfs install --system

# Ensure that everything on the system is up-to-date
brew upgrade


# 3. Test and start the firebase emulator

# Check if firebase.json exists and create if it doesn't
CREATED_FIREBASE_JSON=false

if [ ! -f "firebase.json" ]; then
  echo "Creating firebase.json file..."
  CREATED_FIREBASE_JSON=true
  cat << 'EOL' > firebase.json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}
EOL
fi

firebase emulators:exec --project test "echo 'Firebase emulator installed and started successfully!'"

# Clean up the firebase.json file only if we created it
if [ "$CREATED_FIREBASE_JSON" = true ]; then
  echo "Cleaning up temporary firebase.json file..."
  rm firebase.json
fi

================
File: Scripts/TEMPLATEREADME.md
================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

# Spezi Template Application

This repository contains the Spezi Template Application.
The Spezi Template Application is using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [{{SSTA}}](https://github.com/StanfordSpezi/Spezi{{TA}}).

> [!NOTE]  
> Do you want to learn more about the {{SSTA}} and how to use, extend, and modify this application? Check out the [{{SSTA}} documentation](https://stanfordspezi.github.io/Spezi{{TA}}).


## Spezi Template Application Features

*Provide a comprehensive description of your application, including figures showing the application. You can learn more on how to structure a README in the [Stanford Spezi Documentation Guide](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/documentation-guide)*


## Contributing

*Ensure that you add an adequate contribution section to this README.*


## License

This project is licensed under the MIT License. See [Licenses](LICENSES) for more information.

================
File: TemplateApplication/Account/AccountButton.swift
================
struct AccountButton: View {
    @Binding private var isPresented: Bool
    var body: some View {
    init(isPresented: Binding<Bool>) {

================
File: TemplateApplication/Account/AccountSetupHeader.swift
================
struct AccountSetupHeader: View {
    @Environment(Account.self) private var account
    @Environment(\.accountSetupState) private var setupState
    var body: some View {

================
File: TemplateApplication/Account/AccountSheet.swift
================
struct AccountSheet: View {
    private let dismissAfterSignIn: Bool
    @Environment(\.dismiss) var dismiss
    @Environment(Account.self) private var account
    @Environment(\.accountRequired) var accountRequired
    @State var isInSetup = false
    var body: some View {
    @ToolbarContentBuilder private var closeButton: some ToolbarContent {
    init(dismissAfterSignIn: Bool = true) {
    var details = AccountDetails()

================
File: TemplateApplication/Contacts/Contacts.swift
================
struct Contacts: View {
    let contacts = [
                let address = CNMutablePostalAddress()
    @Environment(Account.self) private var account: Account?
    @Binding var presentingAccount: Bool
    var body: some View {
    init(presentingAccount: Binding<Bool>) {

================
File: TemplateApplication/Firestore/FirebaseConfiguration.swift
================
final class FirebaseConfiguration: Module, DefaultInitializable, @unchecked Sendable {
    enum ConfigurationError: Error {
    static var userCollection: CollectionReference {
    @MainActor var userDocumentReference: DocumentReference {
    @MainActor var userBucketReference: StorageReference {
    @Application(\.logger) private var logger
    @Dependency(Account.self) private var account: Account? // optional, as Firebase might be disabled
    @Dependency(FirebaseAccountService.self) private var accountService: FirebaseAccountService?
    init() {}
    func userDocumentReference(for accountId: String) -> DocumentReference {
    func configure() {
    private func setupTestAccount() async {
        var details = AccountDetails()

================
File: TemplateApplication/Onboarding/AccountOnboarding.swift
================
struct AccountOnboarding: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    var body: some View {
    var details = AccountDetails()

================
File: TemplateApplication/Onboarding/Consent.swift
================
struct Consent: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    private var consentDocument: Data {
    var body: some View {

================
File: TemplateApplication/Onboarding/HealthKitPermissions.swift
================
struct HealthKitPermissions: View {
    @Environment(HealthKit.self) private var healthKit
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    @State private var healthKitProcessing = false
    var body: some View {

================
File: TemplateApplication/Onboarding/InterestingModules.swift
================
struct InterestingModules: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    var body: some View {

================
File: TemplateApplication/Onboarding/NotificationPermissions.swift
================
struct NotificationPermissions: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    @Environment(\.requestNotificationAuthorization) private var requestNotificationAuthorization
    @State private var notificationProcessing = false
    var body: some View {

================
File: TemplateApplication/Onboarding/OnboardingFlow.swift
================
struct OnboardingFlow: View {
    @Environment(HealthKit.self) private var healthKit
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.notificationSettings) private var notificationSettings
    @AppStorage(StorageKeys.onboardingFlowComplete) private var completedOnboardingFlow = false
    @State private var localNotificationAuthorization = false
    @MainActor private var healthKitAuthorization: Bool {
    var body: some View {

================
File: TemplateApplication/Onboarding/Welcome.swift
================
struct Welcome: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath
    var body: some View {

================
File: TemplateApplication/Resources/Assets.xcassets/AccentColor.colorset/Contents.json
================
{
  "colors" : [
    {
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: TemplateApplication/Resources/Assets.xcassets/AccentColor.colorset/Contents.json.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Resources/Assets.xcassets/AppIcon.appiconset/Contents.json
================
{
  "images" : [
    {
      "filename" : "AppIcon.png",
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: TemplateApplication/Resources/Assets.xcassets/AppIcon.appiconset/Contents.json.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Resources/Assets.xcassets/Contents.json
================
{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: TemplateApplication/Resources/Assets.xcassets/Contents.json.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Resources/ConsentDocument.md
================
Spezi can render consent documents in the markdown format: This is a *markdown* **example**.

================
File: TemplateApplication/Resources/ConsentDocument.md.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "ACCOUNT_SETUP_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You may login to your existing account. Or create a new one if you don't have one already."
          }
        }
      }
    },
    "ACCOUNT_SIGNED_IN_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You are already logged in with the account shown below. Continue or change your account by logging out."
          }
        }
      }
    },
    "ACCOUNT_SUBTITLE" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The Template Application demonstrates the usage of the Firebase Account Module."
          }
        }
      }
    },
    "Allow Notifications" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Allow Notifications"
          }
        }
      }
    },
    "Close" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Close"
          }
        }
      }
    },
    "CONSENT_LOADING_ERROR" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please include a markdown based document named \"ConsentDocument\" in your module Bundle."
          }
        }
      }
    },
    "Contact" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Contact"
          }
        }
      }
    },
    "Contacts" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Contacts"
          }
        }
      }
    },
    "Grant Access" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Grant Access"
          }
        }
      }
    },
    "HealthKit Access" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "HealthKit Access"
          }
        }
      }
    },
    "HealthKit Data Source" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "HealthKit Data Source"
          }
        }
      }
    },
    "HEALTHKIT_PERMISSIONS_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This onboarding step allows you to customize the onboarding flow to explain how the application uses the HealthKit data and allows a user to customize the selection."
          }
        }
      }
    },
    "HEALTHKIT_PERMISSIONS_SUBTITLE" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi can access data from HealthKit using the HealthKitDataSource module."
          }
        }
      }
    },
    "HL7 FHIR" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "HL7 FHIR"
          }
        }
      }
    },
    "Interesting Modules" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Interesting Modules"
          }
        }
      }
    },
    "INTERESTING_MODULES_AREA1_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The onboarding module allows you to build an onboarding flow like this one."
          }
        }
      }
    },
    "INTERESTING_MODULES_AREA2_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The application uses HL7 FHIR to provide a common standard to encode data gathered by the application."
          }
        }
      }
    },
    "INTERESTING_MODULES_AREA3_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The contact module allows you to display contact information in your application."
          }
        }
      }
    },
    "INTERESTING_MODULES_AREA4_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The HealthKit data source module allows you to fetch data from HealthKit and e.g. transform it to FHIR resources."
          }
        }
      }
    },
    "INTERESTING_MODULES_SUBTITLE" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Here are a few Spezi modules that are interesting to know about ..."
          }
        }
      }
    },
    "Learn More" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Learn More"
          }
        }
      }
    },
    "LELAND_STANFORD_BIO" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Amasa Leland Stanford (March 9, 1824 – June 21, 1893) was an American industrialist and politician. [...] He and his wife Jane were also the founders of Stanford University, which they named after their late son.\n[https://en.wikipedia.org/wiki/Leland_Stanford]"
          }
        }
      }
    },
    "License Information" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "License Information"
          }
        }
      }
    },
    "Next" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Next"
          }
        }
      }
    },
    "NOTIFICATION_PERMISSIONS_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The Spezi Scheduler module enables to send out local notifications when a new event of a task is scheduled."
          }
        }
      }
    },
    "Notifications" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Notifications"
          }
        }
      }
    },
    "Onboarding" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Onboarding"
          }
        }
      }
    },
    "Please fill out the Social Support Questionnaire every day." : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please fill out the Social Support Questionnaire every day."
          }
        }
      }
    },
    "Schedule" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schedule"
          }
        }
      }
    },
    "Social Support Questionnaire" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Social Support Questionnaire"
          }
        }
      }
    },
    "Spezi Modules" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi Modules"
          }
        }
      }
    },
    "Spezi Scheduler Notifications." : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi Scheduler Notifications."
          }
        }
      }
    },
    "Spezi Template Application" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi\nTemplate Application"
          }
        }
      }
    },
    "Start Questionnaire" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Start Questionnaire"
          }
        }
      }
    },
    "Swift Package Manager" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Swift Package Manager"
          }
        }
      }
    },
    "The Spezi Framework" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The Spezi Framework"
          }
        }
      }
    },
    "This type of event is currently unsupported. Please contact the developer of this app." : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This type of event is currently unsupported. Please contact the developer of this app."
          }
        }
      }
    },
    "Unsupported Event" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unsupported Event"
          }
        }
      }
    },
    "WELCOME_AREA1_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The Spezi Framework builds the foundation of this application."
          }
        }
      }
    },
    "WELCOME_AREA2_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi uses the Swift Package Manager to import it as a dependency."
          }
        }
      }
    },
    "WELCOME_AREA3_DESCRIPTION" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi offers several modules including HealthKit integration, questionnaires, and more ..."
          }
        }
      }
    },
    "WELCOME_SUBTITLE" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This application demonstrates several Spezi features & modules."
          }
        }
      }
    },
    "Your Account" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Your Account"
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: TemplateApplication/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Resources/SocialSupportQuestionnaire.json
================
{
  "resourceType": "Questionnaire",
  "language": "en-US",
  "id": "socialsupport",
  "name": "SocialSupport",
  "title": "Social Support",
  "description": "This survey measures tangible social support plus a couple of demographic questions.",
  "version": "1",
  "status": "draft",
  "publisher": "RAND Corp",
  "meta": {
    "profile": [
      "http://spezi.stanford.edu/fhir/StructureDefinition/sdf-Questionnaire"
    ],
    "tag": [
      {
        "system": "urn:ietf:bcp:47",
        "code": "en-US",
        "display": "English"
      }
    ]
  },
  "useContext": [
    {
      "code": {
        "system": "http://hl7.org/fhir/ValueSet/usage-context-type",
        "code": "focus",
        "display": "Clinical Focus"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "urn:oid:2.16.578.1.12.4.1.1.8655",
            "display": "Social Support"
          }
        ]
      }
    }
  ],
  "contact": [
    {
      "name": "https://www.rand.org/health-care/surveys_tools/mos/social-support/survey-instrument.html"
    }
  ],
  "subjectType": [
    "Patient"
  ],
  "purpose": "The RAND Medical Outcomes Social Support survey is a 4-item questionnaire that measures social support.",
  "copyright": "RAND Corp surveys are open-source and free to use.",
  "date": "2023-01-23T00:00:00-08:00",
  "url": "http://spezi.stanford.edu/fhir/questionnaire/32f43c8e-93e9-4c70-97a0-e716f8030073",
  "item": [
    {
      "linkId": "dcea2683-9815-4505-b240-e75b502b29ef",
      "type": "choice",
      "text": "How often do you need someone to help you if you were confined to bed?",
      "required": false,
      "answerOption": [
        {
          "valueCoding": {
            "id": "3d6fe1b8-c64b-497c-8583-db7ddda9e94e",
            "code": "1",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "None of the time"
          }
        },
        {
          "valueCoding": {
            "id": "b4081e9d-d0f1-4aea-9a15-eac4a15d1d10",
            "code": "2",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "A little of the time"
          }
        },
        {
          "valueCoding": {
            "id": "e32f7952-e280-48d7-9746-c13dbb26638f",
            "code": "3",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Some of the time"
          }
        },
        {
          "valueCoding": {
            "id": "d2f6172d-9402-4cb3-870a-584a7be3a5d7",
            "code": "4",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Most of the time"
          }
        },
        {
          "valueCoding": {
            "id": "ec48001e-f03e-4a14-8a7a-9fcf34fa81d2",
            "code": "5",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "All of the time"
          }
        }
      ]
    },
    {
      "linkId": "ce09d701-7b93-4150-defb-51825e05ade9",
      "type": "choice",
      "text": "How often do you need someone to take you to the doctor if you needed it?",
      "required": false,
      "answerOption": [
        {
          "valueCoding": {
            "id": "3d6fe1b8-c64b-497c-8583-db7ddda9e94e",
            "code": "1",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "None of the time"
          }
        },
        {
          "valueCoding": {
            "id": "b4081e9d-d0f1-4aea-9a15-eac4a15d1d10",
            "code": "2",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "A little of the time"
          }
        },
        {
          "valueCoding": {
            "id": "e32f7952-e280-48d7-9746-c13dbb26638f",
            "code": "3",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Some of the time"
          }
        },
        {
          "valueCoding": {
            "id": "d2f6172d-9402-4cb3-870a-584a7be3a5d7",
            "code": "4",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Most of the time"
          }
        },
        {
          "valueCoding": {
            "id": "ec48001e-f03e-4a14-8a7a-9fcf34fa81d2",
            "code": "5",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "All of the time"
          }
        }
      ]
    },
    {
      "linkId": "58e97564-5f4d-4d4b-86d5-6429cbbc7a8e",
      "type": "choice",
      "text": "How often do you need someone to prepare your meals if you were unable to do it yourself?",
      "required": false,
      "answerOption": [
        {
          "valueCoding": {
            "id": "3d6fe1b8-c64b-497c-8583-db7ddda9e94e",
            "code": "1",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "None of the time"
          }
        },
        {
          "valueCoding": {
            "id": "b4081e9d-d0f1-4aea-9a15-eac4a15d1d10",
            "code": "2",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "A little of the time"
          }
        },
        {
          "valueCoding": {
            "id": "e32f7952-e280-48d7-9746-c13dbb26638f",
            "code": "3",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Some of the time"
          }
        },
        {
          "valueCoding": {
            "id": "d2f6172d-9402-4cb3-870a-584a7be3a5d7",
            "code": "4",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Most of the time"
          }
        },
        {
          "valueCoding": {
            "id": "ec48001e-f03e-4a14-8a7a-9fcf34fa81d2",
            "code": "5",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "All of the time"
          }
        }
      ]
    },
    {
      "linkId": "ad161c49-e8a6-4d31-90e8-02b2887a765f",
      "type": "choice",
      "text": "How often do you need someone to help with daily chores if you were sick",
      "required": false,
      "answerOption": [
        {
          "valueCoding": {
            "id": "3d6fe1b8-c64b-497c-8583-db7ddda9e94e",
            "code": "1",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "None of the time"
          }
        },
        {
          "valueCoding": {
            "id": "b4081e9d-d0f1-4aea-9a15-eac4a15d1d10",
            "code": "2",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "A little of the time"
          }
        },
        {
          "valueCoding": {
            "id": "e32f7952-e280-48d7-9746-c13dbb26638f",
            "code": "3",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Some of the time"
          }
        },
        {
          "valueCoding": {
            "id": "d2f6172d-9402-4cb3-870a-584a7be3a5d7",
            "code": "4",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "Most of the time"
          }
        },
        {
          "valueCoding": {
            "id": "ec48001e-f03e-4a14-8a7a-9fcf34fa81d2",
            "code": "5",
            "system": "urn:uuid:e9ecdd47-2e8b-49b3-8780-9d0769a246aa",
            "display": "All of the time"
          }
        }
      ]
    },
    {
      "linkId": "ba518851-2843-4bbd-c0f7-5b5692d542e0",
      "type": "integer",
      "text": "What is your age?",
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/minValue",
          "valueInteger": 18
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/maxValue",
          "valueInteger": 120
        },
        {
          "url": "http://biodesign.stanford.edu/fhir/StructureDefinition/validationtext",
          "valueString": "Please enter a valid age."
        }
      ],
      "required": false
    },
    {
      "linkId": "695525f3-3e89-4455-8e25-878171c596da",
      "type": "choice",
      "text": "What is your preferred contact method?",
      "required": false,
      "answerOption": [
        {
          "valueCoding": {
            "id": "b7a3d7a5-52b9-49b1-8b59-7a3885483f1c",
            "code": "phone-call",
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "display": "Phone call"
          }
        },
        {
          "valueCoding": {
            "id": "3d42dde0-8e60-4832-bd46-bd06de28cbf2",
            "code": "text-message",
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "display": "Text message"
          }
        },
        {
          "valueCoding": {
            "id": "e672cfc6-118f-4a2d-aafd-02722ff876b9",
            "code": "e-mail",
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "display": "E-mail"
          }
        }
      ]
    },
    {
      "linkId": "c3bea33d-4c50-4f4a-8ae4-1a52be326b19",
      "type": "string",
      "text": "What is your phone number? Ex. (555) 555-5555",
      "required": false,
      "enableWhen": [
        {
          "question": "695525f3-3e89-4455-8e25-878171c596da",
          "operator": "=",
          "answerCoding": {
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "code": "phone-call"
          }
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/regex",
          "valueString": "^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
        },
        {
          "url": "http://biodesign.stanford.edu/fhir/StructureDefinition/validationtext",
          "valueString": "Please enter a valid phone number."
        }
      ]
    },
    {
      "linkId": "8e906a39-5fd0-42a8-f42c-bd96d719dd13",
      "type": "string",
      "text": "What is your text number? Ex. (555) 555-5555",
      "required": false,
      "enableWhen": [
        {
          "question": "695525f3-3e89-4455-8e25-878171c596da",
          "operator": "=",
          "answerCoding": {
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "code": "text-message"
          }
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/regex",
          "valueString": "^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
        },
        {
          "url": "http://biodesign.stanford.edu/fhir/StructureDefinition/validationtext",
          "valueString": "Please enter a valid phone number."
        }
      ]
    },
    {
      "linkId": "86290b0a-017e-4193-8707-dc0c2146f0eb",
      "type": "string",
      "text": "What is your e-mail?",
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/regex",
          "valueString": ".*@.+"
        },
        {
          "url": "http://biodesign.stanford.edu/fhir/StructureDefinition/validationtext",
          "valueString": "Please enter a valid email"
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/minLength",
          "valueInteger": 1
        }
      ],
      "required": false,
      "maxLength": 50,
      "enableWhen": [
        {
          "question": "695525f3-3e89-4455-8e25-878171c596da",
          "operator": "=",
          "answerCoding": {
            "system": "urn:uuid:736ac230-812a-4f4a-edec-5156910fb6ec",
            "code": "e-mail"
          }
        }
      ]
    },
    {
      "linkId": "305f5381-2d8b-4b98-bc04-5a39bee2f7ec",
      "type": "display",
      "text": "Thank you for taking the survey!",
      "required": false
    }
  ]
}

================
File: TemplateApplication/Resources/SocialSupportQuestionnaire.json.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Schedule/Bundle+Questionnaire.swift
================
    func questionnaire(withName name: String) -> Questionnaire {
            let resourceData = try Data(contentsOf: resourceURL)

================
File: TemplateApplication/Schedule/EventView.swift
================
struct EventView: View {
    private let event: Event
    @Environment(TemplateApplicationStandard.self) private var standard
    @Environment(\.dismiss) private var dismiss
    var body: some View {
    init(_ event: Event) {

================
File: TemplateApplication/Schedule/ScheduleView.swift
================
struct ScheduleView: View {
    @Environment(Account.self) private var account: Account?
    @Environment(TemplateApplicationScheduler.self) private var scheduler: TemplateApplicationScheduler
    @State private var presentedEvent: Event?
    @Binding private var presentingAccount: Bool
    var body: some View {
        @Bindable var scheduler = scheduler
    init(presentingAccount: Binding<Bool>) {
    @Previewable @State var presentingAccount = false

================
File: TemplateApplication/Schedule/TemplateApplicationScheduler.swift
================
final class TemplateApplicationScheduler: Module, DefaultInitializable, EnvironmentAccessible {
    @Dependency(Scheduler.self) @ObservationIgnored private var scheduler
    @MainActor var viewState: ViewState = .idle
    init() {}
    func configure() {
    @Property(coding: .json) var questionnaire: Questionnaire?
    @Property(coding: .json) var questionnaireResponse: QuestionnaireResponse?

================
File: TemplateApplication/SharedContext/FeatureFlags.swift
================
enum FeatureFlags {
    static let skipOnboarding = CommandLine.arguments.contains("--skipOnboarding")
    static let showOnboarding = CommandLine.arguments.contains("--showOnboarding")
    static let disableFirebase = CommandLine.arguments.contains("--disableFirebase")
    static let useFirebaseEmulator = true
    static let useFirebaseEmulator = CommandLine.arguments.contains("--useFirebaseEmulator")
    static let setupTestAccount = CommandLine.arguments.contains("--setupTestAccount")

================
File: TemplateApplication/SharedContext/StorageKeys.swift
================
enum StorageKeys {
    static let onboardingFlowComplete = "onboardingFlow.complete"
    static let homeTabSelection = "home.tabselection"
    static let tabViewCustomization = "home.tab-view-customization"

================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Create.md
================
# Create Your Spezi-based Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#
-->

How to create your own Spezi-based application based on the Spezi Template Application.


## 1. Create Your Own Repository

You can create your own Spezi-based application by creating a new GitHub repo and [using the Stanford Spezi Template Application as a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

> Tip: Spezi is completely independent of the Spezi Template Application or any other setup. You can always import one or more Spezi modules in any Swift and SwiftUI-based application.


## 2. Change The Name and Key Information

The Spezi Template application repository provides a convenient script to rename all aspects of the Spezi Template Application to your application name, update the bundle identifier, and remove unused documentation and files that are not needed for your own project.

The shell script can be called as follows:
```bash
$ sh Scripts/create.sh --name <appName> --bundleIdentifier <bundleIdentifier> [--provisioningProfile <provisioningProfileName>] [--firebaseProject <firebaseProjectId>]
```

Argument | Description
--- | ---
`--name` | Name of the application. (required)
`--bundleIdentifier` | The iOS bundle identifier of the application. (required)
`--provisioningProfile` | The name of the iOS provisioning profile to build the application. (optional, defaults to the value of --name)
`--firebaseProject` | The Firebase project identifier. (optional, defaults to the value of --name lowercased without spaces)
`--help` | Display help and exit.

The following example shows renaming the application to "My Spezi App":

```bash
$ sh Scripts/create.sh --name "My Spezi App" --bundleIdentifier "edu.stanford.spezi.myapp"
```

## 3. Setup the Continuous Integration and Delivery Setup

Continuous integration (CI) and continuous delivery (CD) are essential to automatically test and deploy your application at any time.
Each Spezi Template Application-based Spezi app already has the necessary infrastructure in place; the Spezi Template Application includes continuous integration (CI) and continuous delivery (CD) setup:
- Automatically build and test the application on every pull request before deploying it. Suppose your organization doesn't have a self-hosted macOS runner modeled after the setup in the [StanfordBDHG ContinuousIntegration](https://github.com/StanfordBDHG/ContinousIntegration) setup. In that case, you will need to remove the `runsonlabels` arguments in the `build-and-test.yml` file to ensure that the build runs on the default macOS runners provided by GitHub.
- An automated setup to deploy the application to TestFlight every time there is a new commit on the repository's main branch. You will need to provide the provisioning profile and other GitHub secrets to make them available to the GitHub Action.
- Ensure a coherent code style by checking the conformance to the SwiftLint rules defined in `.swiftlint.yml` on every pull request and commit.
- Ensure conformance to the [REUSE Specification]() to property license the application and all related code.
- Deploy documentation of the application to GitHub pages with every commit to the main branch.

Please refer to the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication) and the [ContinuousDelivery Example by Paul Schmiedmayer](https://github.com/PSchmiedmayer/ContinousDelivery) for more background about the CI and CD setup for the Spezi Template Application.

================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Modify.md
================
# Start Development of Your Spezi-based Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#    
-->

Overview of the different parts of the Spezi Template Application-based Spezi app and how to modify them to your needs.

> Important: Please first follow the instructions on how to install all the necessary software to build, run, and modify the application (<doc:Setup>) and how to create your own Spezi-based application based on the Spezi Template Application (<doc:Create>).


## Onboarding Flow

The onboarding contains different steps.
It uses the [**Spezi Onboarding** module](https://github.com/StanfordSpezi/SpeziOnboarding) to display different onboarding-related views like the information about the application, a consent screen, and a screen to display a HealthKit consent view.

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Welcome", alt: "A screen displaying welcome information.") {
            You can find and modify the welcome messages in the ``Welcome`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "InterestingModules", alt: "A screen showing an overview of the modules used in the Spezi Template Application.") {
            You can find and modify the sequential onboarding information in the ``InterestingModules`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "Consent", alt: "A screen displaying the consent view.") {
            You can find and modify the consent setup and surrounding user interface in the ``Consent`` view.
        }
    }
}

The application also automatically pulls and processes HealthKit data types that are defined in the ``TemplateApplicationDelegate`` using the [**Spezi HealthKit** module](https://github.com/StanfordSpezi/SpeziHealthKit).

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "HealthKitAccess", alt: "HealthKit Onboarding Flow") {
            You can find and modify the HealthKit onboarding flow in the ``HealthKitPermissions`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "HealthKitSheet", alt: "Permissions screen of the HealthKit framework") {
            You can define which elements should be pulled from HealthKit in the ``TemplateApplicationDelegate``.
        }
    }
}

## Schedule & Questionnaires

The scheduler part of the application provides the functionality to schedule a recurring task and bind it to an action, e.g., displaying a questionnaire.
It uses the [**Spezi Scheduler**](https://github.com/StanfordSpezi/SpeziScheduler) and [**Spezi Questionnaire**](https://github.com/StanfordSpezi/SpeziQuestionnaire) modules to schedule the tasks as defined in the `TemplateApplicationScheduler`.

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Schedule", alt: "A screen displaying the Scheduler UI.") {
            The elements that are displayed as part of the schedule are defined in the ``TemplateApplicationScheduler`` and displayed using the ``ScheduleView`` and ``EventView``.
        }
    }
    @Column(size: 1) {
        @Image(source: "Notifications", alt: "Onboarding screen showing the Notifications permission screen.") {
            You can find and modify the scheduled tasks, including local notifications, by changing the configuration and setup in the ``TemplateApplicationScheduler``.
        }
    }
    @Column(size: 1) {
        @Image(source: "Questionnaire", alt: "A screen showing a questionnaire using ResearchKit.") {
            The questionnaire content is defined using the FHIR questionnaire information found in the `Resources` folder and defined by the ``TemplateApplicationScheduler``.
        }
    }
    @Column(size: 1) {
        @Image(source: "ScheduleComplete", alt: "The scheduler screen showing the completed UI") {
            The [**Spezi Scheduler**](https://github.com/StanfordSpezi/SpeziScheduler) module keeps track of the completion state and due dates of tasks and events.
        }
    }
}


## Additional Application

The [**Spezi Contacts** module](https://github.com/StanfordSpezi/SpeziContact) uses the contact-related views provided by Spezi. 
The application also gives credit to all dependencies in the Account Details. It uses the [**Spezi License** module](https://github.com/StanfordSpezi/SpeziLicense) to show a list of used Swift Packages.


@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Contacts", alt: "A screen displaying the Contact UI.") {
            You can find and modify the contact information in the ``Contacts`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "License", alt: "License information to list all used Swift Packages") {
            You can investigate the [**Spezi License** module](https://github.com/StanfordSpezi/SpeziLicense) to learn how the application loads and displays the license information.
        }
    }
}

================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Setup.md
================
# Build And Run the Spezi Template Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

The Spezi Template Application is a fully functioning iOS application built using the [Stanford Spezi](https://spezi.stanford.edu) ecosystem that can be used as a starting point for creating your own iOS app. The following tutorial will walk you through the steps needed to configure your Mac to build and run the Spezi Template Application, after which you can customize it for your own project.

## 1. Install Xcode

Applications for the Apple ecosystem are written in the [Swift programming language](https://swift.org).
The framework for developing the user interface for mobile applications in Swift is called [SwiftUI](https://developer.apple.com/xcode/swiftui/).

You will need access to a macOS-based machine to build and run the Swift-based Spezi Template Application. Please ensure that your Mac meets the following criteria and that you install or update the software on your Mac accordingly.

### macOS - Sequoia 15.2 Or Newer

The Mac needs to run macOS Sequoia 15.2 or newer. Please [update to the latest operating system version following the Apple-provided instructions](https://support.apple.com/en-us/HT201541). You can verify that you run the latest macOS version by clicking on the Apple Logo on the top left of your screen and selecting "About this Mac". You can see the macOS version number in the specs list under your Mac picture.

### Xcode - 16.2 Or Newer

Xcode is the integrated development environment (IDE) that is required to build and run Swift-based iOS applications.
You need to have Xcode 16.2 or later installed. [You can install Xcode using the Mac AppStore](https://apps.apple.com/us/app/xcode/id497799835).

Please open Xcode and follow the instructions to finish the installation.

You can verify that you run the latest version of Xcode and everything is installed if you can see the "Welcome to Xcode" screen when you open Xcode, showing 16.2 or newer as the version number.

@Image(source: "Xcode", alt: "Screenshot showing the Welcome to Xcode window.")

You can learn more about Xcode, including [creating an Xcode project for an app](https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app), information about the IDE interface by following the instructions on [creating your app's interface with SwiftUI](https://developer.apple.com/documentation/xcode/creating-your-app-s-interface-with-swiftui) & [Previewing your app's interface in Xcode](https://developer.apple.com/documentation/xcode/previewing-your-apps-interface-in-xcode).


## 2. Install Helper Tools

The Spezi Template Application provides a set of pre-configured tools that simplify app development and enforce best practices.

We provide a simple setup script that installs essential tools like [homebrew](https://brew.sh) (macOS package manager) and [git LFS](https://git-lfs.com) (Git extension for versioning large files).

The script also installs the [Google Firebase emulator and command line interface (CLI)](https://firebase.google.com/docs/cli) and all its dependencies, including Java and Node.js, letting you test cloud features locally without setting up a Firebase project.

You can simply run the script by opening up your macOS [Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) and executing the following command:

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh)"
```

> Tip: If you don't feel comfortable running the setup script, you can [inspect the script yourself](https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh) and use the commands in the script to install the required software yourself selectively.


## 3. Set Up the Backend

As with most complex mobile applications, Stanford Spezi relies on a cloud-based backend to handle user authentication, data storage, and other services. [Google Firebase](https://firebase.google.com) is a managed backend cloud computing platform provided by Google that is pre-integrated with the Spezi Template Application.

> Tip: Although the Spezi Template Application is pre-integrated with Google Firebase, Spezi itself is independent of any cloud provider or platform! Spezi offers different modules to connect to cloud providers, including [Spezi Firebase](https://github.com/StanfordSpezi/SpeziFirebase), which is the cloud provider demonstrated in the Spezi Template Application.

There are two alternatives for testing the Spezi Template Application.

- A. Run the application without Firebase: This option disables all cloud-based functionality but allows for basic testing of local features.
- B. Use the Firebase Emulator Suite: This method emulates Firebase services locally on your Mac, providing a more complete testing environment that mimics cloud functionality.

> Important: These testing approaches are meant for development purposes only. For production deployment, you'll need to use an actual Firebase account. Stanford researchers can utilize the Stanford mHealth platform, Stanford's dedicated Firebase instance that supports many digital health projects.

### Alternative A: Test without Firebase

You can test the application without a backend if you enable the `--disableFirebase` feature flag, which is *enabled by default when opening the Xcode project*. This will disable all cloud-based functionality in the application, including user registration, sign in, and data upload. The login and account setup steps will therefore be skipped in this configuration.

> Tip: Feature flags can be configured in the [scheme editor in Xcode](https://help.apple.com/xcode/mac/11.4/index.html?localePath=en.lproj#/dev0bee46f46) and selecting your application scheme (default **TemplateApplication**), the **Run** configuration, and to switch to the **Arguments** tab to add, enable, disable, or remove arguments passed on launch.

@Image(source: "Scheme", alt: "Screenshot showing the application scheme Run configuration's launch arguments.")


### Alternative B: Set Up the Firebase Emulator Suite

The application also provides a [Firebase Firestore](https://firebase.google.com/docs/firestore)-based data upload mechanism and [Firebase Authentication](https://firebase.google.com/docs/auth) login & sign-up. If you wish to test this functionality, you will need to have the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) installed and running. This tool emulates a cloud-based backend on your Mac and does not require that you have a Firebase account to use.

The setup script described above installs the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite).

> Important: You do not have to make any modifications to the Firebase configuration, log into the `Firebase` CLI using your Google account, or create a project in Firebase to run, build, and test the application!

Navigate to the root folder of this setup containing your **.xcodeproj** file ([using `cd` in your terminal](https://tutorials.codebar.io/command-line/introduction/tutorial.html)) and start the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) in your [Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) using
```bash
$ firebase emulators:start
```

@Image(source: "FirebaseCLI", alt: "Screenshot showing the terminal and the running Firebase Emulators.")

After the emulators have started up, you can open the web interface by navigating to `http://127.0.0.1:4000/` in your web browser. When you run the Spezi Template Application in the next step, you will be able to use the application and see data populating in the emulator.

@Image(source: "FirebaseWeb", alt: "Screenshot showing Safari and the Firebase Emulators web interface.")


## 4. Run the App

You can build and run the Spezi Template Application using [Xcode](https://developer.apple.com/xcode/) by opening up the **.xcodeproj** file in the root of the repository. Ensure that the `Run Destination` in the upper toolbar is set to an iOS simulator such as `iPhone 16 Pro (18.0)`.

For more information and details on how to run the app on other simulators or physical devices, please see [Building and running an app](https://developer.apple.com/documentation/xcode/building-and-running-an-app) in the official Apple documentation.

@Row(numberOfColumns: 4) {
    @Column(size: 3) {
        @Image(source: "Run", alt: "Press the run button in the upper left corner to run the app.") {
            Press the run button in the upper left corner to run the app.
        }
    }
    @Column {
        @Image(source: "Welcome", alt: "The Spezi Template Application running in the iOS Simulator.") {
            The Spezi Template Application running in the iOS Simulator.
        }
    }
}

> Tip: When building the application you may encounter a build error "Target 'SpeziAccountMacros' must be enabled before it can be used.'". This error can be addressed by clicking on the error message in the Issue Navigator and selecting the "Trust & Enable" option.

## 5. Modify The Application

Now that you have successfully built and run the Spezi Template Application on your Mac, you can start customizing the application for your project. Continue with the <doc:Modify> article to learn how to make common modifications to the Spezi Template Application.


### Firebase Cloud Setup

If you want to connect your project to a development or production Firebase cloud project, you can provide your [`GoogleService-Info.plist`](https://firebase.google.com/docs/ios/setup) in a base 64 representation in the [GitHub secrets](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) (`GOOGLE_SERVICE_INFO_PLIST_BASE64`) of your project where it is picked up and loaded in the configured path setup in the [`beta-deployment.yml`] [GitHub Action](https://docs.github.com/en/actions) using the `googleserviceinfoplistpath` parameter that needs to be adapted to your project structure.

You can generate a base 64 representation of a file after you [navigated into the folder](https://en.wikipedia.org/wiki/Cd_(command)#Usage) where you have downloaded your [`GoogleService-Info.plist`](https://firebase.google.com/docs/ios/setup) file to.
```shell
base64 -i GoogleService-Info.plist
```

> Warning: We do **not recommend** to commit your Firebase secrets and configuration file to your project. While one can extract the file from the deployed application, we encourage open-source projects to make it clear to contributors to set up their own Firebase project if they plan to build and deploy a version of an open-source project.

The deployment requires you to store your Google service account JSON credentials in a base 64 representation in the `GOOGLE_APPLICATION_CREDENTIALS_BASE64`. You can learn more about how to generate the JSON in the [Firebase documentation](https://firebase.google.com/docs/app-distribution/authenticate-service-account). The service account must have the minimally required permissions (not the `Firebase App Distribution Admin` role) as documented at https://firebase.google.com/docs/projects/iam/roles-predefined for your deployment needs and setup.

Be sure to update your `.firebaserc` project name and placeholder `GoogleService-Info.plist` project identifier to always reflect the name of your project and all security rules to reflect any changes in your application.


### Other Configuration Options

The application also includes the following feature flags that can be configured in the [scheme editor in Xcode](https://help.apple.com/xcode/mac/11.4/index.html?localePath=en.lproj#/dev0bee46f46) and selecting your scheme, the **Run** configuration, and to switch to the **Arguments** tab to add, enable, disable, or remove the following arguments passed on launch:
- `--skipOnboarding`: Skips the onboarding flow to enable easier development of features in the application and to allow UI tests to skip the onboarding flow.
- `--showOnboarding`: Always show the onboarding when the application is launched. Makes it easy to modify and test the onboarding flow without the need to manually remove the application or reset the simulator.
- `--disableFirebase`: Disables the Firebase interactions, including the login/sign-up step and the Firebase Firestore upload.
- `--useFirebaseEmulator`: Defines if the application should connect to the local Firebase emulator. Always set to true when using the iOS simulator.

> Tip: You can learn how to add, modify, and remove feature flags that are passed to the application when it is started in the [Customizing the build schemes for a project](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables) tutorial in the [*Specify launch arguments and environment variables* section](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables).

================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/TemplateApplication.md
================
# ``TemplateApplication``

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Template to provide a starting point for Spezi-based applications.

## Overview

The Spezi Template Application demonstrates using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication).

> Tip: Do you want to try out the Spezi Template Application? You can download it to your iOS device using [TestFlight](https://testflight.apple.com/join/ipEezBY1)!

The following screenshots show a wide variety of features based on Spezi Modules that are part of the Spezi Template Application.

@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Welcome", alt: "A screen displaying welcome information.") {
            Welcome View.
        }
    }
    @Column(size: 1) {
        @Image(source: "InterestingModules", alt: "A screen showing an overview of the modules used in the Spezi Template Application.") {
            Interesting Modules
        }
    }
    @Column(size: 1) {
        @Image(source: "Consent", alt: "A screen displaying the consent view.") {
            Consent Signature.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "HealthKitAccess", alt: "HealthKit Onboarding Flow") {
            HealthKit Access.
        }
    }
    @Column(size: 1) {
        @Image(source: "HealthKitSheet", alt: "Permissions screen of the HealthKit framework") {
            Granular HealthKit Share Control.
        }
    }
    @Column(size: 1) {
        @Image(source: "Notifications", alt: "Onboarding screen showing the Notifications permission screen.") {
            Trigger Local Notifications.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Schedule", alt: "A screen displaying the Scheduler UI.") {
            Schedule Tasks.
        }
    }
    @Column(size: 1) {
        @Image(source: "Questionnaire", alt: "A screen showing a questionnaire using ResearchKit.") {
            Display Questionnaires.
        }
    }
    @Column(size: 1) {
        @Image(source: "ScheduleComplete", alt: "The scheduler screen showing the completed UI") {
            Keep Track of Tasks.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Contacts", alt: "A screen displaying the Contact UI.") {
            Contact Information.
        }
    }
    @Column(size: 1) {
        @Image(source: "Account", alt: "A screen displaying the current user account information.") {
            Account Overview.
        }
    }
    @Column(size: 1) {
        @Image(source: "License", alt: "License information to list all used Swift Packages") {
            License Information.
        }
    }
}

> Tip: You can find all the used Spezi Modules in the [Stanford Spezi GitHub Organization](https://github.com/StanfordSpezi).

================
File: TemplateApplication/Supporting Files/GoogleService-Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CLIENT_ID</key>
	<string>CLIENT_ID</string>
	<key>REVERSED_CLIENT_ID</key>
	<string>REVERSED_CLIENT_ID</string>
	<key>API_KEY</key>
	<string>API_KEY</string>
	<key>GCM_SENDER_ID</key>
	<string>GCM_SENDER_ID</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>edu.stanford.spezi.templateapplication</string>
	<key>PROJECT_ID</key>
	<string>stanfordspezitemplateapp</string>
	<key>STORAGE_BUCKET</key>
	<string>STORAGE_BUCKET</string>
	<key>IS_ADS_ENABLED</key>
	<false/>
	<key>IS_ANALYTICS_ENABLED</key>
	<false/>
	<key>IS_APPINVITE_ENABLED</key>
	<true/>
	<key>IS_GCM_ENABLED</key>
	<true/>
	<key>IS_SIGNIN_ENABLED</key>
	<true/>
	<key>GOOGLE_APP_ID</key>
	<string>1:123456789012:ios:1234567890123456789012</string>
</dict>
</plist>

================
File: TemplateApplication/Supporting Files/GoogleService-Info.plist.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Supporting Files/Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleAllowMixedLocalizations</key>
	<true/>
	<key>FirebaseAppDelegateProxyEnabled</key>
	<false/>
	<key>ITSAppUsesNonExemptEncryption</key>
	<false/>
	<key>UIApplicationSceneManifest</key>
	<dict>
		<key>UIApplicationSupportsMultipleScenes</key>
		<false/>
		<key>UISceneConfigurations</key>
		<dict/>
	</dict>
	<key>UIBackgroundModes</key>
	<array>
		<string>fetch</string>
	</array>
</dict>
</plist>

================
File: TemplateApplication/Supporting Files/Info.plist.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/Supporting Files/TemplateApplication.entitlements
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.applesignin</key>
	<array>
		<string>Default</string>
	</array>
	<key>com.apple.developer.healthkit</key>
	<true/>
	<key>com.apple.developer.healthkit.access</key>
	<array/>
	<key>com.apple.developer.healthkit.background-delivery</key>
	<true/>
	<key>com.apple.developer.usernotifications.time-sensitive</key>
	<true/>
</dict>
</plist>

================
File: TemplateApplication/Supporting Files/TemplateApplication.entitlements.license
================
This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: TemplateApplication/HomeView.swift
================
struct HomeView: View {
    enum Tabs: String {
    @AppStorage(StorageKeys.homeTabSelection) private var selectedTab = Tabs.schedule
    @AppStorage(StorageKeys.tabViewCustomization) private var tabViewCustomization = TabViewCustomization()
    @State private var presentingAccount = false
    var body: some View {
    var details = AccountDetails()

================
File: TemplateApplication/TemplateApplication.swift
================
struct TemplateApplication: App {
    @UIApplicationDelegateAdaptor(TemplateApplicationDelegate.self) var appDelegate
    @AppStorage(StorageKeys.onboardingFlowComplete) var completedOnboardingFlow = false
    var body: some Scene {

================
File: TemplateApplication/TemplateApplicationDelegate.swift
================
class TemplateApplicationDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
    private var accountEmulator: (host: String, port: Int)? {
    private var firestore: Firestore {
        let settings = FirestoreSettings()
    private var healthKit: HealthKit {

================
File: TemplateApplication/TemplateApplicationStandard.swift
================
actor TemplateApplicationStandard: Standard,
    @Application(\.logger) private var logger
    @Dependency(FirebaseConfiguration.self) private var configuration
    init() {}
    func add(sample: HKSample) async {
    func remove(sample: HKDeletedObject) async {
    func add(response: ModelsR4.QuestionnaireResponse, isolation: isolated (any Actor)? = #isolation) async {
        let id = response.identifier?.value?.value?.string ?? UUID().uuidString
            let jsonRepresentation = (try? String(data: JSONEncoder().encode(response), encoding: .utf8)) ?? ""
    private func healthKitDocument(id uuid: UUID) async throws -> DocumentReference {
    func respondToEvent(_ event: AccountNotifications.Event) async {
    func store(consent: ConsentDocumentExport) async throws {
        let formatter = DateFormatter()
        let dateString = formatter.string(from: Date())
            let filePath = basePath.appending(path: "consentForm_\(dateString).pdf")
            let metadata = StorageMetadata()

================
File: TemplateApplication/TemplateApplicationTestingSetup.swift
================
private struct TemplateAppTestingSetup: ViewModifier {
    @AppStorage(StorageKeys.onboardingFlowComplete) var completedOnboardingFlow = false
    func body(content: Content) -> some View {
    func testingSetup() -> some View {

================
File: TemplateApplication.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved
================
{
  "originHash" : "e566af545b9f57d2bd81f3027a32e4266db2435eeb389fdcd616f88529edfff2",
  "pins" : [
    {
      "identity" : "abseil-cpp-binary",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/abseil-cpp-binary.git",
      "state" : {
        "revision" : "194a6706acbd25e4ef639bcaddea16e8758a3e27",
        "version" : "1.2024011602.0"
      }
    },
    {
      "identity" : "antlr4",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/antlr/antlr4.git",
      "state" : {
        "revision" : "cc82115a4e7f53d71d9d905caa2c2dfa4da58899",
        "version" : "4.13.2"
      }
    },
    {
      "identity" : "app-check",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/app-check.git",
      "state" : {
        "revision" : "61b85103a1aeed8218f17c794687781505fbbef5",
        "version" : "11.2.0"
      }
    },
    {
      "identity" : "collectionconcurrencykit",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/JohnSundell/CollectionConcurrencyKit.git",
      "state" : {
        "revision" : "b4f23e24b5a1bff301efc5e70871083ca029ff95",
        "version" : "0.2.0"
      }
    },
    {
      "identity" : "cryptoswift",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/krzyzanowskim/CryptoSwift.git",
      "state" : {
        "revision" : "729e01bc9b9dab466ac85f21fb9ee2bc1c61b258",
        "version" : "1.8.4"
      }
    },
    {
      "identity" : "fhirmodels",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/FHIRModels",
      "state" : {
        "revision" : "861afd5816a98d38f86220eab2f812d76cad84a0",
        "version" : "0.5.0"
      }
    },
    {
      "identity" : "firebase-ios-sdk",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/firebase-ios-sdk.git",
      "state" : {
        "revision" : "6318278e8e64d21f0fdcc69004395e4d34048aaf",
        "version" : "11.8.1"
      }
    },
    {
      "identity" : "googleappmeasurement",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleAppMeasurement.git",
      "state" : {
        "revision" : "be0881ff728eca210ccb628092af400c086abda3",
        "version" : "11.7.0"
      }
    },
    {
      "identity" : "googledatatransport",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleDataTransport.git",
      "state" : {
        "revision" : "617af071af9aa1d6a091d59a202910ac482128f9",
        "version" : "10.1.0"
      }
    },
    {
      "identity" : "googleutilities",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/GoogleUtilities.git",
      "state" : {
        "revision" : "53156c7ec267db846e6b64c9f4c4e31ba4cf75eb",
        "version" : "8.0.2"
      }
    },
    {
      "identity" : "grpc-binary",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/grpc-binary.git",
      "state" : {
        "revision" : "f56d8fc3162de9a498377c7b6cea43431f4f5083",
        "version" : "1.65.1"
      }
    },
    {
      "identity" : "gtm-session-fetcher",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/gtm-session-fetcher.git",
      "state" : {
        "revision" : "4d70340d55d7d07cc2fdf8e8125c4c126c1d5f35",
        "version" : "4.4.0"
      }
    },
    {
      "identity" : "healthkitonfhir",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/HealthKitOnFHIR.git",
      "state" : {
        "revision" : "c898c0bace660ecae37fc682d629f7883f92e700",
        "version" : "0.2.13"
      }
    },
    {
      "identity" : "interop-ios-for-google-sdks",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/interop-ios-for-google-sdks.git",
      "state" : {
        "revision" : "2d12673670417654f08f5f90fdd62926dc3a2648",
        "version" : "100.0.0"
      }
    },
    {
      "identity" : "leveldb",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/leveldb.git",
      "state" : {
        "revision" : "a0bc79961d7be727d258d33d5a6b2f1023270ba1",
        "version" : "1.22.5"
      }
    },
    {
      "identity" : "nanopb",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/firebase/nanopb.git",
      "state" : {
        "revision" : "b7e1104502eca3a213b46303391ca4d3bc8ddec1",
        "version" : "2.30910.0"
      }
    },
    {
      "identity" : "promises",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/google/promises.git",
      "state" : {
        "revision" : "540318ecedd63d883069ae7f1ed811a2df00b6ac",
        "version" : "2.4.0"
      }
    },
    {
      "identity" : "researchkit",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/ResearchKit",
      "state" : {
        "revision" : "08ab0290140e5a5e0e81d46cade1f09c7282facf",
        "version" : "3.0.3"
      }
    },
    {
      "identity" : "researchkitonfhir",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/ResearchKitOnFHIR.git",
      "state" : {
        "revision" : "2c70b9dc7a1be9c804222e93d1737be9fca9af84",
        "version" : "2.0.3"
      }
    },
    {
      "identity" : "sourcekitten",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/jpsim/SourceKitten.git",
      "state" : {
        "revision" : "fd4df99170f5e9d7cf9aa8312aa8506e0e7a44e7",
        "version" : "0.35.0"
      }
    },
    {
      "identity" : "spezi",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/Spezi.git",
      "state" : {
        "revision" : "4513a697572e8e1faea1e0ee52e6fad4b8d3dd8d",
        "version" : "1.8.0"
      }
    },
    {
      "identity" : "speziaccount",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziAccount.git",
      "state" : {
        "revision" : "6f6684486d37fa72e532725578582328b2546995",
        "version" : "2.1.3"
      }
    },
    {
      "identity" : "spezicontact",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziContact.git",
      "state" : {
        "revision" : "8dd7cb426e79f30ced23f37e438c0ca38bfe9a47",
        "version" : "1.0.2"
      }
    },
    {
      "identity" : "spezifirebase",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziFirebase.git",
      "state" : {
        "revision" : "73b8aa818044597231d5dff002415b1e836280d1",
        "version" : "2.0.3"
      }
    },
    {
      "identity" : "spezifoundation",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziFoundation.git",
      "state" : {
        "revision" : "c844b98242829fe44e7908739374d4c8b88d6da7",
        "version" : "2.1.0"
      }
    },
    {
      "identity" : "spezihealthkit",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziHealthKit.git",
      "state" : {
        "revision" : "35e4a4a1171d113e477591ed01f0ba5ec6d5a19d",
        "version" : "1.0.0-beta.3"
      }
    },
    {
      "identity" : "spezilicense",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziLicense.git",
      "state" : {
        "revision" : "2249ce615a624a072834e31e7906b779ba82b824",
        "version" : "0.1.1"
      }
    },
    {
      "identity" : "spezinotifications",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziNotifications.git",
      "state" : {
        "revision" : "b886f192282a925f600ec5ecbc94acfc75460293",
        "version" : "1.0.3"
      }
    },
    {
      "identity" : "spezionboarding",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziOnboarding.git",
      "state" : {
        "revision" : "a3d7bc15e6803b2205eb8dca010a48b1a40215be",
        "version" : "1.2.2"
      }
    },
    {
      "identity" : "speziquestionnaire",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziQuestionnaire.git",
      "state" : {
        "revision" : "d0bd55f8a0bd3eeb806a673261e9d6b9fd43f3cd",
        "version" : "1.2.3"
      }
    },
    {
      "identity" : "spezischeduler",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziScheduler.git",
      "state" : {
        "revision" : "d2059174c05b25ae284f26288154b7d2dd46e44c",
        "version" : "1.1.2"
      }
    },
    {
      "identity" : "spezistorage",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziStorage.git",
      "state" : {
        "revision" : "b5dfb4a551d3f4243e2798133d6da2414a70e274",
        "version" : "2.1.0"
      }
    },
    {
      "identity" : "speziviews",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordSpezi/SpeziViews.git",
      "state" : {
        "revision" : "80c7cdfd5e50c3e279ab889cc90bbcfc88c4f24c",
        "version" : "1.9.0"
      }
    },
    {
      "identity" : "swift-algorithms",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-algorithms.git",
      "state" : {
        "revision" : "87e50f483c54e6efd60e885f7f5aa946cee68023",
        "version" : "1.2.1"
      }
    },
    {
      "identity" : "swift-argument-parser",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-argument-parser.git",
      "state" : {
        "revision" : "41982a3656a71c768319979febd796c6fd111d5c",
        "version" : "1.5.0"
      }
    },
    {
      "identity" : "swift-atomics",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-atomics.git",
      "state" : {
        "revision" : "cd142fd2f64be2100422d658e7411e39489da985",
        "version" : "1.2.0"
      }
    },
    {
      "identity" : "swift-collections",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-collections.git",
      "state" : {
        "revision" : "671108c96644956dddcd89dd59c203dcdb36cec7",
        "version" : "1.1.4"
      }
    },
    {
      "identity" : "swift-numerics",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-numerics.git",
      "state" : {
        "revision" : "0a5bc04095a675662cf24757cc0640aa2204253b",
        "version" : "1.0.2"
      }
    },
    {
      "identity" : "swift-package-list",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/FelixHerrmann/swift-package-list",
      "state" : {
        "revision" : "04bf1229e12e80ee5e52c2d90a274c9029179ea1",
        "version" : "4.5.0"
      }
    },
    {
      "identity" : "swift-protobuf",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/apple/swift-protobuf.git",
      "state" : {
        "revision" : "ebc7251dd5b37f627c93698e4374084d98409633",
        "version" : "1.28.2"
      }
    },
    {
      "identity" : "swift-syntax",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/swiftlang/swift-syntax.git",
      "state" : {
        "revision" : "cb53fa1bd3219b0b23ded7dfdd3b2baff266fd25",
        "version" : "600.0.0"
      }
    },
    {
      "identity" : "swiftlint",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/realm/SwiftLint.git",
      "state" : {
        "revision" : "eba420f77846e93beb98d516b225abeb2fef4ca2",
        "version" : "0.58.2"
      }
    },
    {
      "identity" : "swiftytexttable",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/scottrhoyt/SwiftyTextTable.git",
      "state" : {
        "revision" : "c6df6cf533d120716bff38f8ff9885e1ce2a4ac3",
        "version" : "0.9.0"
      }
    },
    {
      "identity" : "swxmlhash",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/drmohundro/SWXMLHash.git",
      "state" : {
        "revision" : "a853604c9e9a83ad9954c7e3d2a565273982471f",
        "version" : "7.0.2"
      }
    },
    {
      "identity" : "xctestextensions",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/XCTestExtensions.git",
      "state" : {
        "revision" : "3b44aad358897cf85139b46f32902cd60d9e5cb4",
        "version" : "1.2.1"
      }
    },
    {
      "identity" : "xcthealthkit",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/XCTHealthKit.git",
      "state" : {
        "revision" : "9353b5fea249a73e9b35761bd781c63c02088203",
        "version" : "1.1.1"
      }
    },
    {
      "identity" : "xctruntimeassertions",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/StanfordBDHG/XCTRuntimeAssertions.git",
      "state" : {
        "revision" : "f560ec8410af032dd485ca9386e8c2b5d3e1a1f8",
        "version" : "1.1.3"
      }
    },
    {
      "identity" : "yams",
      "kind" : "remoteSourceControl",
      "location" : "https://github.com/jpsim/Yams.git",
      "state" : {
        "revision" : "2688707e563b44d7d87c29ba6c5ca04ce86ae58b",
        "version" : "5.3.0"
      }
    }
  ],
  "version" : 3
}

================
File: TemplateApplication.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>

================
File: TemplateApplication.xcodeproj/project.xcworkspace/contents.xcworkspacedata
================
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "self:">
   </FileRef>
</Workspace>

================
File: TemplateApplication.xcodeproj/xcshareddata/xcschemes/TemplateApplication.xcscheme
================
<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1600"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "653A254C283387FE005D4D48"
               BuildableName = "TemplateApplication.app"
               BlueprintName = "TemplateApplication"
               ReferencedContainer = "container:TemplateApplication.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Test"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <TestPlans>
         <TestPlanReference
            reference = "container:TemplateApplication.xctestplan"
            default = "YES">
         </TestPlanReference>
      </TestPlans>
      <Testables>
         <TestableReference
            skipped = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "653A255C28338800005D4D48"
               BuildableName = "TemplateApplicationTests.xctest"
               BlueprintName = "TemplateApplicationTests"
               ReferencedContainer = "container:TemplateApplication.xcodeproj">
            </BuildableReference>
         </TestableReference>
         <TestableReference
            skipped = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "653A256628338800005D4D48"
               BuildableName = "TemplateApplicationUITests.xctest"
               BlueprintName = "TemplateApplicationUITests"
               ReferencedContainer = "container:TemplateApplication.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "653A254C283387FE005D4D48"
            BuildableName = "TemplateApplication.app"
            BlueprintName = "TemplateApplication"
            ReferencedContainer = "container:TemplateApplication.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
      <CommandLineArguments>
         <CommandLineArgument
            argument = "--disableFirebase"
            isEnabled = "YES">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--showOnboarding"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--skipOnboarding"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--testSchedule"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--useFirebaseEmulator"
            isEnabled = "NO">
         </CommandLineArgument>
      </CommandLineArguments>
      <EnvironmentVariables>
         <EnvironmentVariable
            key = "IDEPreferLogStreaming"
            value = "YES"
            isEnabled = "YES">
         </EnvironmentVariable>
      </EnvironmentVariables>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Release"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "653A254C283387FE005D4D48"
            BuildableName = "TemplateApplication.app"
            BlueprintName = "TemplateApplication"
            ReferencedContainer = "container:TemplateApplication.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>

================
File: TemplateApplication.xcodeproj/project.pbxproj
================
// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 63;
	objects = {

/* Begin PBXBuildFile section */
		2F1AC9DF2B4E840E00C24973 /* TemplateApplication.docc in Sources */ = {isa = PBXBuildFile; fileRef = 2F1AC9DE2B4E840E00C24973 /* TemplateApplication.docc */; };
		2F3D4ABC2A4E7C290068FB2F /* SpeziScheduler in Frameworks */ = {isa = PBXBuildFile; productRef = 2F3D4ABB2A4E7C290068FB2F /* SpeziScheduler */; };
		2F49B7762980407C00BCB272 /* Spezi in Frameworks */ = {isa = PBXBuildFile; productRef = 2F49B7752980407B00BCB272 /* Spezi */; };
		2F4E237E2989A2FE0013F3D9 /* OnboardingTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F4E237D2989A2FE0013F3D9 /* OnboardingTests.swift */; };
		2F4E23832989D51F0013F3D9 /* TemplateApplicationTestingSetup.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F4E23822989D51F0013F3D9 /* TemplateApplicationTestingSetup.swift */; };
		2F4E23872989DB360013F3D9 /* ContactsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F4E23862989DB360013F3D9 /* ContactsTests.swift */; };
		2F5E32BD297E05EA003432F8 /* TemplateApplicationDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F5E32BC297E05EA003432F8 /* TemplateApplicationDelegate.swift */; };
		2F6025CB29BBE70F0045459E /* GoogleService-Info.plist in Resources */ = {isa = PBXBuildFile; fileRef = 2F6025CA29BBE70F0045459E /* GoogleService-Info.plist */; };
		2F65B44E2A3B8B0600A36932 /* NotificationPermissions.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F65B44D2A3B8B0600A36932 /* NotificationPermissions.swift */; };
		2FA0BFED2ACC977500E0EF83 /* Localizable.xcstrings in Resources */ = {isa = PBXBuildFile; fileRef = 2FA0BFEC2ACC977500E0EF83 /* Localizable.xcstrings */; };
		2FB099AF2A875DF100B20952 /* FirebaseAuth in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB099AE2A875DF100B20952 /* FirebaseAuth */; };
		2FB099B12A875DF100B20952 /* FirebaseFirestore in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB099B02A875DF100B20952 /* FirebaseFirestore */; };
		2FB099B62A875E2B00B20952 /* HealthKitOnFHIR in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB099B52A875E2B00B20952 /* HealthKitOnFHIR */; };
		2FBD738C2A3BD150004228E7 /* SpeziScheduler in Frameworks */ = {isa = PBXBuildFile; productRef = 2FBD738B2A3BD150004228E7 /* SpeziScheduler */; };
		2FC3439029EE6346002D773C /* SocialSupportQuestionnaire.json in Resources */ = {isa = PBXBuildFile; fileRef = 2FE5DC5529EDD811004B9AB4 /* SocialSupportQuestionnaire.json */; };
		2FC3439129EE6349002D773C /* AppIcon.png in Resources */ = {isa = PBXBuildFile; fileRef = 2FE5DC2A29EDD78D004B9AB4 /* AppIcon.png */; };
		2FC3439229EE634B002D773C /* ConsentDocument.md in Resources */ = {isa = PBXBuildFile; fileRef = 2FE5DC2C29EDD78E004B9AB4 /* ConsentDocument.md */; };
		2FC975A82978F11A00BA99FE /* HomeView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FC975A72978F11A00BA99FE /* HomeView.swift */; };
		2FE5DC2629EDD38A004B9AB4 /* Contacts.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC2529EDD38A004B9AB4 /* Contacts.swift */; };
		2FE5DC3529EDD7CA004B9AB4 /* Consent.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC2F29EDD7CA004B9AB4 /* Consent.swift */; };
		2FE5DC3629EDD7CA004B9AB4 /* HealthKitPermissions.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3029EDD7CA004B9AB4 /* HealthKitPermissions.swift */; };
		2FE5DC3729EDD7CA004B9AB4 /* OnboardingFlow.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3129EDD7CA004B9AB4 /* OnboardingFlow.swift */; };
		2FE5DC3829EDD7CA004B9AB4 /* InterestingModules.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3229EDD7CA004B9AB4 /* InterestingModules.swift */; };
		2FE5DC3A29EDD7CA004B9AB4 /* Welcome.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3429EDD7CA004B9AB4 /* Welcome.swift */; };
		2FE5DC4029EDD7EE004B9AB4 /* FeatureFlags.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3E29EDD7ED004B9AB4 /* FeatureFlags.swift */; };
		2FE5DC4129EDD7EE004B9AB4 /* StorageKeys.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC3F29EDD7EE004B9AB4 /* StorageKeys.swift */; };
		2FE5DC4E29EDD7FA004B9AB4 /* ScheduleView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC4829EDD7FA004B9AB4 /* ScheduleView.swift */; };
		2FE5DC5229EDD7FA004B9AB4 /* TemplateApplicationScheduler.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC4C29EDD7FA004B9AB4 /* TemplateApplicationScheduler.swift */; };
		2FE5DC5329EDD7FA004B9AB4 /* Bundle+Questionnaire.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DC4D29EDD7FA004B9AB4 /* Bundle+Questionnaire.swift */; };
		2FE5DC6429EDD883004B9AB4 /* SpeziAccount in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC6329EDD883004B9AB4 /* SpeziAccount */; };
		2FE5DC6729EDD894004B9AB4 /* SpeziContact in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC6629EDD894004B9AB4 /* SpeziContact */; };
		2FE5DC7529EDD8E6004B9AB4 /* SpeziFirebaseAccount in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC7429EDD8E6004B9AB4 /* SpeziFirebaseAccount */; };
		2FE5DC7729EDD8E6004B9AB4 /* SpeziFirebaseConfiguration in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC7629EDD8E6004B9AB4 /* SpeziFirebaseConfiguration */; };
		2FE5DC7929EDD8E6004B9AB4 /* SpeziFirestore in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC7829EDD8E6004B9AB4 /* SpeziFirestore */; };
		2FE5DC8429EDD934004B9AB4 /* SpeziQuestionnaire in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC8329EDD934004B9AB4 /* SpeziQuestionnaire */; };
		2FE5DC8A29EDD972004B9AB4 /* SpeziLocalStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC8929EDD972004B9AB4 /* SpeziLocalStorage */; };
		2FE5DC8F29EDD980004B9AB4 /* SpeziViews in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC8E29EDD980004B9AB4 /* SpeziViews */; };
		2FE5DC9929EDD9D9004B9AB4 /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC9829EDD9D9004B9AB4 /* XCTestExtensions */; };
		2FE5DC9C29EDD9EF004B9AB4 /* XCTHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC9B29EDD9EF004B9AB4 /* XCTHealthKit */; };
		2FE5DCB129EE6107004B9AB4 /* AccountOnboarding.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE5DCAC29EE6107004B9AB4 /* AccountOnboarding.swift */; };
		2FF53D8D2A8729D600042B76 /* TemplateApplicationStandard.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FF53D8C2A8729D600042B76 /* TemplateApplicationStandard.swift */; };
		5680DD3E2AB8CD84004E6D4A /* ContributionsTest.swift in Sources */ = {isa = PBXBuildFile; fileRef = 5680DD3D2AB8CD84004E6D4A /* ContributionsTest.swift */; };
		56E708352BB06B7100B08F0A /* SpeziLicense in Frameworks */ = {isa = PBXBuildFile; productRef = 56E708342BB06B7100B08F0A /* SpeziLicense */; };
		56E7083B2BB06F6F00B08F0A /* SwiftPackageList in Frameworks */ = {isa = PBXBuildFile; productRef = 56E7083A2BB06F6F00B08F0A /* SwiftPackageList */; };
		653A2551283387FE005D4D48 /* TemplateApplication.swift in Sources */ = {isa = PBXBuildFile; fileRef = 653A2550283387FE005D4D48 /* TemplateApplication.swift */; };
		653A255528338800005D4D48 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 653A255428338800005D4D48 /* Assets.xcassets */; };
		653A256228338800005D4D48 /* TemplateApplicationTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 653A256128338800005D4D48 /* TemplateApplicationTests.swift */; };
		653A256C28338800005D4D48 /* SchedulerTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 653A256B28338800005D4D48 /* SchedulerTests.swift */; };
		802D05742D679D1F002469F2 /* SpeziHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 802D05732D679D1F002469F2 /* SpeziHealthKit */; };
		802D05762D679D1F002469F2 /* SpeziHealthKitUI in Frameworks */ = {isa = PBXBuildFile; productRef = 802D05752D679D1F002469F2 /* SpeziHealthKitUI */; };
		80C7B8702D67DE6F0016BCAF /* SpeziHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 80C7B86F2D67DE6F0016BCAF /* SpeziHealthKit */; };
		80C7B8722D67DE6F0016BCAF /* SpeziHealthKitUI in Frameworks */ = {isa = PBXBuildFile; productRef = 80C7B8712D67DE6F0016BCAF /* SpeziHealthKitUI */; };
		80CC1A2C2D678F5B008654B5 /* SpeziKeychainStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 80CC1A2B2D678F5B008654B5 /* SpeziKeychainStorage */; };
		9733CFC62A8066DE001B7ABC /* SpeziOnboarding in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE5DC8029EDD91D004B9AB4 /* SpeziOnboarding */; };
		9739A0C62AD7B5730084BEA5 /* FirebaseStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 9739A0C52AD7B5730084BEA5 /* FirebaseStorage */; };
		97D73D6A2AD860AD00B47FA0 /* SpeziFirebaseStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 97D73D692AD860AD00B47FA0 /* SpeziFirebaseStorage */; };
		A94DDFFD2CBD1190004930BD /* SpeziNotifications in Frameworks */ = {isa = PBXBuildFile; productRef = A94DDFFC2CBD1190004930BD /* SpeziNotifications */; };
		A9720E432ABB68CC00872D23 /* AccountSetupHeader.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9720E422ABB68CC00872D23 /* AccountSetupHeader.swift */; };
		A98FF2B12CD131F500DFC949 /* EventView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98FF2B02CD131F500DFC949 /* EventView.swift */; };
		A994264E2CD25EB3002F8BD5 /* XCTSpeziAccount in Frameworks */ = {isa = PBXBuildFile; productRef = A994264D2CD25EB3002F8BD5 /* XCTSpeziAccount */; };
		A9947BF02CC131ED0068AA8A /* SpeziSchedulerUI in Frameworks */ = {isa = PBXBuildFile; productRef = A9947BEF2CC131ED0068AA8A /* SpeziSchedulerUI */; };
		A9947BF42CC142BD0068AA8A /* XCTSpeziNotifications in Frameworks */ = {isa = PBXBuildFile; productRef = A9947BF32CC142BD0068AA8A /* XCTSpeziNotifications */; };
		A9A3DCC82C75CBBD00FC9B69 /* FirebaseConfiguration.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9A3DCC72C75CB9A00FC9B69 /* FirebaseConfiguration.swift */; };
		A9D83F962B083794000D0C78 /* SpeziFirebaseAccountStorage in Frameworks */ = {isa = PBXBuildFile; productRef = A9D83F952B083794000D0C78 /* SpeziFirebaseAccountStorage */; };
		A9DFE8A92ABE551400428242 /* AccountButton.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9DFE8A82ABE551400428242 /* AccountButton.swift */; };
		A9FE7AD02AA39BAB0077B045 /* AccountSheet.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9FE7ACF2AA39BAB0077B045 /* AccountSheet.swift */; };
/* End PBXBuildFile section */

/* Begin PBXContainerItemProxy section */
		653A255E28338800005D4D48 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 653A2545283387FE005D4D48 /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 653A254C283387FE005D4D48;
			remoteInfo = TemplateApplication;
		};
		653A256828338800005D4D48 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 653A2545283387FE005D4D48 /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 653A254C283387FE005D4D48;
			remoteInfo = TemplateApplication;
		};
/* End PBXContainerItemProxy section */

/* Begin PBXFileReference section */
		2F1AC9DE2B4E840E00C24973 /* TemplateApplication.docc */ = {isa = PBXFileReference; lastKnownFileType = folder.documentationcatalog; path = TemplateApplication.docc; sourceTree = "<group>"; };
		2F4E237D2989A2FE0013F3D9 /* OnboardingTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingTests.swift; sourceTree = "<group>"; };
		2F4E23822989D51F0013F3D9 /* TemplateApplicationTestingSetup.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TemplateApplicationTestingSetup.swift; sourceTree = "<group>"; };
		2F4E23862989DB360013F3D9 /* ContactsTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ContactsTests.swift; sourceTree = "<group>"; };
		2F5E32BC297E05EA003432F8 /* TemplateApplicationDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TemplateApplicationDelegate.swift; sourceTree = "<group>"; };
		2F6025CA29BBE70F0045459E /* GoogleService-Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; path = "GoogleService-Info.plist"; sourceTree = "<group>"; };
		2F65B44D2A3B8B0600A36932 /* NotificationPermissions.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = NotificationPermissions.swift; sourceTree = "<group>"; };
		2FA0BFEC2ACC977500E0EF83 /* Localizable.xcstrings */ = {isa = PBXFileReference; lastKnownFileType = text.json.xcstrings; path = Localizable.xcstrings; sourceTree = "<group>"; };
		2FAEC07F297F583900C11C42 /* TemplateApplication.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TemplateApplication.entitlements; sourceTree = "<group>"; };
		2FC94CD4298B0A1D009C8209 /* TemplateApplication.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TemplateApplication.xctestplan; sourceTree = "<group>"; };
		2FC975A72978F11A00BA99FE /* HomeView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = HomeView.swift; sourceTree = "<group>"; };
		2FE5DC2529EDD38A004B9AB4 /* Contacts.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Contacts.swift; sourceTree = "<group>"; };
		2FE5DC2A29EDD78D004B9AB4 /* AppIcon.png */ = {isa = PBXFileReference; lastKnownFileType = image.png; path = AppIcon.png; sourceTree = "<group>"; };
		2FE5DC2C29EDD78E004B9AB4 /* ConsentDocument.md */ = {isa = PBXFileReference; lastKnownFileType = net.daringfireball.markdown; path = ConsentDocument.md; sourceTree = "<group>"; };
		2FE5DC2F29EDD7CA004B9AB4 /* Consent.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = Consent.swift; sourceTree = "<group>"; };
		2FE5DC3029EDD7CA004B9AB4 /* HealthKitPermissions.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = HealthKitPermissions.swift; sourceTree = "<group>"; };
		2FE5DC3129EDD7CA004B9AB4 /* OnboardingFlow.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = OnboardingFlow.swift; sourceTree = "<group>"; };
		2FE5DC3229EDD7CA004B9AB4 /* InterestingModules.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = InterestingModules.swift; sourceTree = "<group>"; };
		2FE5DC3429EDD7CA004B9AB4 /* Welcome.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = Welcome.swift; sourceTree = "<group>"; };
		2FE5DC3E29EDD7ED004B9AB4 /* FeatureFlags.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = FeatureFlags.swift; sourceTree = "<group>"; };
		2FE5DC3F29EDD7EE004B9AB4 /* StorageKeys.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = StorageKeys.swift; sourceTree = "<group>"; };
		2FE5DC4829EDD7FA004B9AB4 /* ScheduleView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = ScheduleView.swift; sourceTree = "<group>"; };
		2FE5DC4C29EDD7FA004B9AB4 /* TemplateApplicationScheduler.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TemplateApplicationScheduler.swift; sourceTree = "<group>"; };
		2FE5DC4D29EDD7FA004B9AB4 /* Bundle+Questionnaire.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = "Bundle+Questionnaire.swift"; sourceTree = "<group>"; };
		2FE5DC5529EDD811004B9AB4 /* SocialSupportQuestionnaire.json */ = {isa = PBXFileReference; lastKnownFileType = text.json; path = SocialSupportQuestionnaire.json; sourceTree = "<group>"; };
		2FE5DCAC29EE6107004B9AB4 /* AccountOnboarding.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = AccountOnboarding.swift; sourceTree = "<group>"; };
		2FF53D8C2A8729D600042B76 /* TemplateApplicationStandard.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TemplateApplicationStandard.swift; sourceTree = "<group>"; };
		5680DD3D2AB8CD84004E6D4A /* ContributionsTest.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ContributionsTest.swift; sourceTree = "<group>"; };
		653A254D283387FE005D4D48 /* TemplateApplication.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TemplateApplication.app; sourceTree = BUILT_PRODUCTS_DIR; };
		653A2550283387FE005D4D48 /* TemplateApplication.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TemplateApplication.swift; sourceTree = "<group>"; };
		653A255428338800005D4D48 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		653A255D28338800005D4D48 /* TemplateApplicationTests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TemplateApplicationTests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		653A256128338800005D4D48 /* TemplateApplicationTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TemplateApplicationTests.swift; sourceTree = "<group>"; };
		653A256728338800005D4D48 /* TemplateApplicationUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TemplateApplicationUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		653A256B28338800005D4D48 /* SchedulerTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SchedulerTests.swift; sourceTree = "<group>"; };
		653A258928339462005D4D48 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
		A9720E422ABB68CC00872D23 /* AccountSetupHeader.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AccountSetupHeader.swift; sourceTree = "<group>"; };
		A98FF2B02CD131F500DFC949 /* EventView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = EventView.swift; sourceTree = "<group>"; };
		A9A3DCC72C75CB9A00FC9B69 /* FirebaseConfiguration.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirebaseConfiguration.swift; sourceTree = "<group>"; };
		A9DFE8A82ABE551400428242 /* AccountButton.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AccountButton.swift; sourceTree = "<group>"; };
		A9FE7ACF2AA39BAB0077B045 /* AccountSheet.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AccountSheet.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		653A254A283387FE005D4D48 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				9733CFC62A8066DE001B7ABC /* SpeziOnboarding in Frameworks */,
				2FE5DC6429EDD883004B9AB4 /* SpeziAccount in Frameworks */,
				802D05762D679D1F002469F2 /* SpeziHealthKitUI in Frameworks */,
				80C7B8702D67DE6F0016BCAF /* SpeziHealthKit in Frameworks */,
				A9947BF02CC131ED0068AA8A /* SpeziSchedulerUI in Frameworks */,
				2FB099AF2A875DF100B20952 /* FirebaseAuth in Frameworks */,
				97D73D6A2AD860AD00B47FA0 /* SpeziFirebaseStorage in Frameworks */,
				2FE5DC6729EDD894004B9AB4 /* SpeziContact in Frameworks */,
				2FE5DC8429EDD934004B9AB4 /* SpeziQuestionnaire in Frameworks */,
				80C7B8722D67DE6F0016BCAF /* SpeziHealthKitUI in Frameworks */,
				802D05742D679D1F002469F2 /* SpeziHealthKit in Frameworks */,
				2FB099B12A875DF100B20952 /* FirebaseFirestore in Frameworks */,
				80CC1A2C2D678F5B008654B5 /* SpeziKeychainStorage in Frameworks */,
				A94DDFFD2CBD1190004930BD /* SpeziNotifications in Frameworks */,
				A9D83F962B083794000D0C78 /* SpeziFirebaseAccountStorage in Frameworks */,
				2FB099B62A875E2B00B20952 /* HealthKitOnFHIR in Frameworks */,
				56E7083B2BB06F6F00B08F0A /* SwiftPackageList in Frameworks */,
				56E708352BB06B7100B08F0A /* SpeziLicense in Frameworks */,
				2FE5DC8A29EDD972004B9AB4 /* SpeziLocalStorage in Frameworks */,
				2FE5DC7529EDD8E6004B9AB4 /* SpeziFirebaseAccount in Frameworks */,
				9739A0C62AD7B5730084BEA5 /* FirebaseStorage in Frameworks */,
				2F49B7762980407C00BCB272 /* Spezi in Frameworks */,
				2FE5DC8F29EDD980004B9AB4 /* SpeziViews in Frameworks */,
				2F3D4ABC2A4E7C290068FB2F /* SpeziScheduler in Frameworks */,
				2FBD738C2A3BD150004228E7 /* SpeziScheduler in Frameworks */,
				2FE5DC7929EDD8E6004B9AB4 /* SpeziFirestore in Frameworks */,
				2FE5DC7729EDD8E6004B9AB4 /* SpeziFirebaseConfiguration in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A255A28338800005D4D48 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A256428338800005D4D48 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FE5DC9929EDD9D9004B9AB4 /* XCTestExtensions in Frameworks */,
				2FE5DC9C29EDD9EF004B9AB4 /* XCTHealthKit in Frameworks */,
				A994264E2CD25EB3002F8BD5 /* XCTSpeziAccount in Frameworks */,
				A9947BF42CC142BD0068AA8A /* XCTSpeziNotifications in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2FC9759D2978E30800BA99FE /* Supporting Files */ = {
			isa = PBXGroup;
			children = (
				2FAEC07F297F583900C11C42 /* TemplateApplication.entitlements */,
				653A258928339462005D4D48 /* Info.plist */,
				2F6025CA29BBE70F0045459E /* GoogleService-Info.plist */,
				2F1AC9DE2B4E840E00C24973 /* TemplateApplication.docc */,
			);
			path = "Supporting Files";
			sourceTree = "<group>";
		};
		2FE5DC2729EDD38D004B9AB4 /* Contacts */ = {
			isa = PBXGroup;
			children = (
				2FE5DC2529EDD38A004B9AB4 /* Contacts.swift */,
			);
			path = Contacts;
			sourceTree = "<group>";
		};
		2FE5DC2829EDD398004B9AB4 /* Onboarding */ = {
			isa = PBXGroup;
			children = (
				2FE5DC3129EDD7CA004B9AB4 /* OnboardingFlow.swift */,
				2FE5DC3429EDD7CA004B9AB4 /* Welcome.swift */,
				2FE5DC3229EDD7CA004B9AB4 /* InterestingModules.swift */,
				2FE5DCAC29EE6107004B9AB4 /* AccountOnboarding.swift */,
				2FE5DC2F29EDD7CA004B9AB4 /* Consent.swift */,
				2FE5DC3029EDD7CA004B9AB4 /* HealthKitPermissions.swift */,
				2F65B44D2A3B8B0600A36932 /* NotificationPermissions.swift */,
			);
			path = Onboarding;
			sourceTree = "<group>";
		};
		2FE5DC2D29EDD792004B9AB4 /* Resources */ = {
			isa = PBXGroup;
			children = (
				2FE5DC2A29EDD78D004B9AB4 /* AppIcon.png */,
				653A255428338800005D4D48 /* Assets.xcassets */,
				2FE5DC2C29EDD78E004B9AB4 /* ConsentDocument.md */,
				2FA0BFEC2ACC977500E0EF83 /* Localizable.xcstrings */,
				2FE5DC5529EDD811004B9AB4 /* SocialSupportQuestionnaire.json */,
			);
			path = Resources;
			sourceTree = "<group>";
		};
		2FE5DC3B29EDD7D0004B9AB4 /* Schedule */ = {
			isa = PBXGroup;
			children = (
				2FE5DC4D29EDD7FA004B9AB4 /* Bundle+Questionnaire.swift */,
				2FE5DC4829EDD7FA004B9AB4 /* ScheduleView.swift */,
				A98FF2B02CD131F500DFC949 /* EventView.swift */,
				2FE5DC4C29EDD7FA004B9AB4 /* TemplateApplicationScheduler.swift */,
			);
			path = Schedule;
			sourceTree = "<group>";
		};
		2FE5DC3C29EDD7DA004B9AB4 /* SharedContext */ = {
			isa = PBXGroup;
			children = (
				2FE5DC3E29EDD7ED004B9AB4 /* FeatureFlags.swift */,
				2FE5DC3F29EDD7EE004B9AB4 /* StorageKeys.swift */,
			);
			path = SharedContext;
			sourceTree = "<group>";
		};
		653A2544283387FE005D4D48 = {
			isa = PBXGroup;
			children = (
				2FC94CD4298B0A1D009C8209 /* TemplateApplication.xctestplan */,
				653A254F283387FE005D4D48 /* TemplateApplication */,
				653A256028338800005D4D48 /* TemplateApplicationTests */,
				653A256A28338800005D4D48 /* TemplateApplicationUITests */,
				653A254E283387FE005D4D48 /* Products */,
				653A258B283395A7005D4D48 /* Frameworks */,
			);
			sourceTree = "<group>";
		};
		653A254E283387FE005D4D48 /* Products */ = {
			isa = PBXGroup;
			children = (
				653A254D283387FE005D4D48 /* TemplateApplication.app */,
				653A255D28338800005D4D48 /* TemplateApplicationTests.xctest */,
				653A256728338800005D4D48 /* TemplateApplicationUITests.xctest */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		653A254F283387FE005D4D48 /* TemplateApplication */ = {
			isa = PBXGroup;
			children = (
				2FC975A72978F11A00BA99FE /* HomeView.swift */,
				653A2550283387FE005D4D48 /* TemplateApplication.swift */,
				2F5E32BC297E05EA003432F8 /* TemplateApplicationDelegate.swift */,
				2FF53D8C2A8729D600042B76 /* TemplateApplicationStandard.swift */,
				2F4E23822989D51F0013F3D9 /* TemplateApplicationTestingSetup.swift */,
				A9720E412ABB68B300872D23 /* Account */,
				2FE5DC2729EDD38D004B9AB4 /* Contacts */,
				A9A3DCC62C75CB8D00FC9B69 /* Firestore */,
				2FE5DC2829EDD398004B9AB4 /* Onboarding */,
				2FE5DC2D29EDD792004B9AB4 /* Resources */,
				2FE5DC3B29EDD7D0004B9AB4 /* Schedule */,
				2FE5DC3C29EDD7DA004B9AB4 /* SharedContext */,
				2FC9759D2978E30800BA99FE /* Supporting Files */,
			);
			path = TemplateApplication;
			sourceTree = "<group>";
		};
		653A256028338800005D4D48 /* TemplateApplicationTests */ = {
			isa = PBXGroup;
			children = (
				653A256128338800005D4D48 /* TemplateApplicationTests.swift */,
			);
			path = TemplateApplicationTests;
			sourceTree = "<group>";
		};
		653A256A28338800005D4D48 /* TemplateApplicationUITests */ = {
			isa = PBXGroup;
			children = (
				2F4E237D2989A2FE0013F3D9 /* OnboardingTests.swift */,
				653A256B28338800005D4D48 /* SchedulerTests.swift */,
				2F4E23862989DB360013F3D9 /* ContactsTests.swift */,
				5680DD3D2AB8CD84004E6D4A /* ContributionsTest.swift */,
			);
			path = TemplateApplicationUITests;
			sourceTree = "<group>";
		};
		653A258B283395A7005D4D48 /* Frameworks */ = {
			isa = PBXGroup;
			children = (
			);
			name = Frameworks;
			sourceTree = "<group>";
		};
		A9720E412ABB68B300872D23 /* Account */ = {
			isa = PBXGroup;
			children = (
				A9FE7ACF2AA39BAB0077B045 /* AccountSheet.swift */,
				A9720E422ABB68CC00872D23 /* AccountSetupHeader.swift */,
				A9DFE8A82ABE551400428242 /* AccountButton.swift */,
			);
			path = Account;
			sourceTree = "<group>";
		};
		A9A3DCC62C75CB8D00FC9B69 /* Firestore */ = {
			isa = PBXGroup;
			children = (
				A9A3DCC72C75CB9A00FC9B69 /* FirebaseConfiguration.swift */,
			);
			path = Firestore;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		653A254C283387FE005D4D48 /* TemplateApplication */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 653A257128338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplication" */;
			buildPhases = (
				653A2549283387FE005D4D48 /* Sources */,
				653A254A283387FE005D4D48 /* Frameworks */,
				653A254B283387FE005D4D48 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				A9E1D3432C67A3F800CED217 /* PBXTargetDependency */,
				56E7083D2BB06FCA00B08F0A /* PBXTargetDependency */,
			);
			name = TemplateApplication;
			packageProductDependencies = (
				2F49B7752980407B00BCB272 /* Spezi */,
				2FE5DC6329EDD883004B9AB4 /* SpeziAccount */,
				2FE5DC6629EDD894004B9AB4 /* SpeziContact */,
				2FE5DC7429EDD8E6004B9AB4 /* SpeziFirebaseAccount */,
				2FE5DC7629EDD8E6004B9AB4 /* SpeziFirebaseConfiguration */,
				2FE5DC7829EDD8E6004B9AB4 /* SpeziFirestore */,
				2FE5DC8329EDD934004B9AB4 /* SpeziQuestionnaire */,
				2FE5DC8929EDD972004B9AB4 /* SpeziLocalStorage */,
				2FE5DC8E29EDD980004B9AB4 /* SpeziViews */,
				2FBD738B2A3BD150004228E7 /* SpeziScheduler */,
				2F3D4ABB2A4E7C290068FB2F /* SpeziScheduler */,
				2FE5DC8029EDD91D004B9AB4 /* SpeziOnboarding */,
				2FB099AE2A875DF100B20952 /* FirebaseAuth */,
				2FB099B02A875DF100B20952 /* FirebaseFirestore */,
				2FB099B52A875E2B00B20952 /* HealthKitOnFHIR */,
				9739A0C52AD7B5730084BEA5 /* FirebaseStorage */,
				97D73D692AD860AD00B47FA0 /* SpeziFirebaseStorage */,
				A9D83F952B083794000D0C78 /* SpeziFirebaseAccountStorage */,
				56E708342BB06B7100B08F0A /* SpeziLicense */,
				56E7083A2BB06F6F00B08F0A /* SwiftPackageList */,
				A94DDFFC2CBD1190004930BD /* SpeziNotifications */,
				A9947BEF2CC131ED0068AA8A /* SpeziSchedulerUI */,
				80CC1A2B2D678F5B008654B5 /* SpeziKeychainStorage */,
				802D05732D679D1F002469F2 /* SpeziHealthKit */,
				802D05752D679D1F002469F2 /* SpeziHealthKitUI */,
				80C7B86F2D67DE6F0016BCAF /* SpeziHealthKit */,
				80C7B8712D67DE6F0016BCAF /* SpeziHealthKitUI */,
			);
			productName = TemplateApplication;
			productReference = 653A254D283387FE005D4D48 /* TemplateApplication.app */;
			productType = "com.apple.product-type.application";
		};
		653A255C28338800005D4D48 /* TemplateApplicationTests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 653A257428338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplicationTests" */;
			buildPhases = (
				653A255928338800005D4D48 /* Sources */,
				653A255A28338800005D4D48 /* Frameworks */,
				653A255B28338800005D4D48 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				A9E1D3462C67B0A300CED217 /* PBXTargetDependency */,
				653A255F28338800005D4D48 /* PBXTargetDependency */,
			);
			name = TemplateApplicationTests;
			productName = TemplateApplicationTests;
			productReference = 653A255D28338800005D4D48 /* TemplateApplicationTests.xctest */;
			productType = "com.apple.product-type.bundle.unit-test";
		};
		653A256628338800005D4D48 /* TemplateApplicationUITests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 653A257728338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplicationUITests" */;
			buildPhases = (
				653A256328338800005D4D48 /* Sources */,
				653A256428338800005D4D48 /* Frameworks */,
				653A256528338800005D4D48 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				A9E1D3482C67B0A700CED217 /* PBXTargetDependency */,
				653A256928338800005D4D48 /* PBXTargetDependency */,
			);
			name = TemplateApplicationUITests;
			packageProductDependencies = (
				2FE5DC9829EDD9D9004B9AB4 /* XCTestExtensions */,
				2FE5DC9B29EDD9EF004B9AB4 /* XCTHealthKit */,
				A9947BF32CC142BD0068AA8A /* XCTSpeziNotifications */,
				A994264D2CD25EB3002F8BD5 /* XCTSpeziAccount */,
			);
			productName = TemplateApplicationUITests;
			productReference = 653A256728338800005D4D48 /* TemplateApplicationUITests.xctest */;
			productType = "com.apple.product-type.bundle.ui-testing";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		653A2545283387FE005D4D48 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1340;
				LastUpgradeCheck = 1600;
				TargetAttributes = {
					653A254C283387FE005D4D48 = {
						CreatedOnToolsVersion = 13.4;
					};
					653A255C28338800005D4D48 = {
						CreatedOnToolsVersion = 13.4;
						TestTargetID = 653A254C283387FE005D4D48;
					};
					653A256628338800005D4D48 = {
						CreatedOnToolsVersion = 13.4;
						TestTargetID = 653A254C283387FE005D4D48;
					};
				};
			};
			buildConfigurationList = 653A2548283387FE005D4D48 /* Build configuration list for PBXProject "TemplateApplication" */;
			compatibilityVersion = "Xcode 15.3";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 653A2544283387FE005D4D48;
			packageReferences = (
				2F49B7742980407B00BCB272 /* XCRemoteSwiftPackageReference "Spezi" */,
				2FE5DC6229EDD883004B9AB4 /* XCRemoteSwiftPackageReference "SpeziAccount" */,
				2FE5DC6529EDD894004B9AB4 /* XCRemoteSwiftPackageReference "SpeziContact" */,
				2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */,
				2FE5DC8229EDD934004B9AB4 /* XCRemoteSwiftPackageReference "SpeziQuestionnaire" */,
				2FE5DC8829EDD972004B9AB4 /* XCRemoteSwiftPackageReference "SpeziStorage" */,
				2FE5DC8D29EDD980004B9AB4 /* XCRemoteSwiftPackageReference "SpeziViews" */,
				2FE5DC9029EDD9C3004B9AB4 /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */,
				2FE5DC9729EDD9D9004B9AB4 /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
				2FE5DC9A29EDD9EF004B9AB4 /* XCRemoteSwiftPackageReference "XCTHealthKit" */,
				2F3D4ABA2A4E7C290068FB2F /* XCRemoteSwiftPackageReference "SpeziScheduler" */,
				97F466E62A76BBEE005DC9B4 /* XCRemoteSwiftPackageReference "SpeziOnboarding" */,
				2FB099B42A875E2B00B20952 /* XCRemoteSwiftPackageReference "HealthKitOnFHIR" */,
				5661551B2AB8384200209B80 /* XCRemoteSwiftPackageReference "swift-package-list" */,
				56E708332BB06B7100B08F0A /* XCRemoteSwiftPackageReference "SpeziLicense" */,
				2F66D20D2BB723180010D555 /* XCRemoteSwiftPackageReference "SwiftLint" */,
				A945FCD32C9C6BFA00B9EBC7 /* XCRemoteSwiftPackageReference "ResearchKitOnFHIR" */,
				A94DDFFB2CBD1190004930BD /* XCRemoteSwiftPackageReference "SpeziNotifications" */,
				80C7B86E2D67DE6F0016BCAF /* XCRemoteSwiftPackageReference "SpeziHealthKit" */,
			);
			productRefGroup = 653A254E283387FE005D4D48 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				653A254C283387FE005D4D48 /* TemplateApplication */,
				653A255C28338800005D4D48 /* TemplateApplicationTests */,
				653A256628338800005D4D48 /* TemplateApplicationUITests */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		653A254B283387FE005D4D48 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FC3439229EE634B002D773C /* ConsentDocument.md in Resources */,
				2FC3439129EE6349002D773C /* AppIcon.png in Resources */,
				653A255528338800005D4D48 /* Assets.xcassets in Resources */,
				2FC3439029EE6346002D773C /* SocialSupportQuestionnaire.json in Resources */,
				2FA0BFED2ACC977500E0EF83 /* Localizable.xcstrings in Resources */,
				2F6025CB29BBE70F0045459E /* GoogleService-Info.plist in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A255B28338800005D4D48 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A256528338800005D4D48 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		653A2549283387FE005D4D48 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FE5DC4129EDD7EE004B9AB4 /* StorageKeys.swift in Sources */,
				2FE5DCB129EE6107004B9AB4 /* AccountOnboarding.swift in Sources */,
				2FE5DC3A29EDD7CA004B9AB4 /* Welcome.swift in Sources */,
				2FE5DC3829EDD7CA004B9AB4 /* InterestingModules.swift in Sources */,
				2FE5DC3529EDD7CA004B9AB4 /* Consent.swift in Sources */,
				2FC975A82978F11A00BA99FE /* HomeView.swift in Sources */,
				2FE5DC4E29EDD7FA004B9AB4 /* ScheduleView.swift in Sources */,
				A9DFE8A92ABE551400428242 /* AccountButton.swift in Sources */,
				A9A3DCC82C75CBBD00FC9B69 /* FirebaseConfiguration.swift in Sources */,
				2FE5DC3729EDD7CA004B9AB4 /* OnboardingFlow.swift in Sources */,
				2F1AC9DF2B4E840E00C24973 /* TemplateApplication.docc in Sources */,
				2FF53D8D2A8729D600042B76 /* TemplateApplicationStandard.swift in Sources */,
				A9720E432ABB68CC00872D23 /* AccountSetupHeader.swift in Sources */,
				2FE5DC4029EDD7EE004B9AB4 /* FeatureFlags.swift in Sources */,
				2F4E23832989D51F0013F3D9 /* TemplateApplicationTestingSetup.swift in Sources */,
				A98FF2B12CD131F500DFC949 /* EventView.swift in Sources */,
				2FE5DC5329EDD7FA004B9AB4 /* Bundle+Questionnaire.swift in Sources */,
				2F5E32BD297E05EA003432F8 /* TemplateApplicationDelegate.swift in Sources */,
				2FE5DC5229EDD7FA004B9AB4 /* TemplateApplicationScheduler.swift in Sources */,
				A9FE7AD02AA39BAB0077B045 /* AccountSheet.swift in Sources */,
				653A2551283387FE005D4D48 /* TemplateApplication.swift in Sources */,
				2FE5DC3629EDD7CA004B9AB4 /* HealthKitPermissions.swift in Sources */,
				2F65B44E2A3B8B0600A36932 /* NotificationPermissions.swift in Sources */,
				2FE5DC2629EDD38A004B9AB4 /* Contacts.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A255928338800005D4D48 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				653A256228338800005D4D48 /* TemplateApplicationTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		653A256328338800005D4D48 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				5680DD3E2AB8CD84004E6D4A /* ContributionsTest.swift in Sources */,
				2F4E23872989DB360013F3D9 /* ContactsTests.swift in Sources */,
				2F4E237E2989A2FE0013F3D9 /* OnboardingTests.swift in Sources */,
				653A256C28338800005D4D48 /* SchedulerTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin PBXTargetDependency section */
		56E7083D2BB06FCA00B08F0A /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			productRef = 56E7083C2BB06FCA00B08F0A /* SwiftPackageListPlugin */;
		};
		653A255F28338800005D4D48 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 653A254C283387FE005D4D48 /* TemplateApplication */;
			targetProxy = 653A255E28338800005D4D48 /* PBXContainerItemProxy */;
		};
		653A256928338800005D4D48 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 653A254C283387FE005D4D48 /* TemplateApplication */;
			targetProxy = 653A256828338800005D4D48 /* PBXContainerItemProxy */;
		};
		A9E1D3432C67A3F800CED217 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			productRef = A9E1D3422C67A3F800CED217 /* SwiftLintBuildToolPlugin */;
		};
		A9E1D3462C67B0A300CED217 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			productRef = A9E1D3452C67B0A300CED217 /* SwiftLintBuildToolPlugin */;
		};
		A9E1D3482C67B0A700CED217 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			productRef = A9E1D3472C67B0A700CED217 /* SwiftLintBuildToolPlugin */;
		};
/* End PBXTargetDependency section */

/* Begin XCBuildConfiguration section */
		2FEE10302998C89C000822E1 /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++17";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.2;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = TEST;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
			};
			name = Test;
		};
		2FEE10312998C89C000822E1 /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = "TemplateApplication/Supporting Files/TemplateApplication.entitlements";
				CODE_SIGN_IDENTITY = "Apple Development";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = "";
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = "TemplateApplication/Supporting Files/Info.plist";
				INFOPLIST_KEY_NSCameraUsageDescription = "This message should never appear. Please adjust this when you start using camera information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSLocationAlwaysAndWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSLocationWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMicrophoneUsageDescription = "This message should never appear. Please adjust this when you start using microphone information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMotionUsageDescription = "This message should never appear. Please adjust this when you start using motion information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSSpeechRecognitionUsageDescription = "This message should never appear. Please adjust this when you start using speecg information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				INFOPLIST_KEY_UITemplateApplicationlicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UITemplateApplicationlicationSupportsIndirectInputEvents = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Test;
		};
		2FEE10322998C89C000822E1 /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication.tests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/TemplateApplication.app/TemplateApplication";
			};
			name = Test;
		};
		2FEE10332998C89C000822E1 /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplicationuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TemplateApplication;
			};
			name = Test;
		};
		653A256F28338800005D4D48 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++17";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.2;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
			};
			name = Debug;
		};
		653A257028338800005D4D48 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++17";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.2;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		653A257228338800005D4D48 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = "TemplateApplication/Supporting Files/TemplateApplication.entitlements";
				CODE_SIGN_IDENTITY = "Apple Development";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = "";
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = "TemplateApplication/Supporting Files/Info.plist";
				INFOPLIST_KEY_NSCameraUsageDescription = "This message should never appear. Please adjust this when you start using camera information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSLocationAlwaysAndWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSLocationWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMicrophoneUsageDescription = "This message should never appear. Please adjust this when you start using microphone information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMotionUsageDescription = "This message should never appear. Please adjust this when you start using motion information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSSpeechRecognitionUsageDescription = "This message should never appear. Please adjust this when you start using speecg information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				INFOPLIST_KEY_UITemplateApplicationlicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UITemplateApplicationlicationSupportsIndirectInputEvents = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Debug;
		};
		653A257328338800005D4D48 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = "TemplateApplication/Supporting Files/TemplateApplication.entitlements";
				CODE_SIGN_IDENTITY = "Apple Development";
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Distribution";
				CODE_SIGN_STYLE = Manual;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = "";
				"DEVELOPMENT_TEAM[sdk=iphoneos*]" = 637867499T;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = "TemplateApplication/Supporting Files/Info.plist";
				INFOPLIST_KEY_NSCameraUsageDescription = "This message should never appear. Please adjust this when you start using camera information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The Spezi Template Application uses the step count to demonstrate Spezi's integration with HealthKit.";
				INFOPLIST_KEY_NSLocationAlwaysAndWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSLocationWhenInUseUsageDescription = "This message should never appear. Please adjust this when you start using location information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMicrophoneUsageDescription = "This message should never appear. Please adjust this when you start using microphone information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSMotionUsageDescription = "This message should never appear. Please adjust this when you start using motion information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_NSSpeechRecognitionUsageDescription = "This message should never appear. Please adjust this when you start using speecg information. We have to put this in here as ResearchKit has the possibility to use it and not putting it here returns an error on AppStore Connect.";
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				INFOPLIST_KEY_UITemplateApplicationlicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UITemplateApplicationlicationSupportsIndirectInputEvents = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				"PROVISIONING_PROFILE_SPECIFIER[sdk=iphoneos*]" = "Spezi Template Application";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Release;
		};
		653A257528338800005D4D48 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication.tests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/TemplateApplication.app/TemplateApplication";
			};
			name = Debug;
		};
		653A257628338800005D4D48 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplication.tests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/TemplateApplication.app/TemplateApplication";
			};
			name = Release;
		};
		653A257828338800005D4D48 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplicationuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TemplateApplication;
			};
			name = Debug;
		};
		653A257928338800005D4D48 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.templateapplicationuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				"SWIFT_ELicenseRef-TemplateApplication_LOC_STRINGS" = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TemplateApplication;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		653A2548283387FE005D4D48 /* Build configuration list for PBXProject "TemplateApplication" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				653A256F28338800005D4D48 /* Debug */,
				2FEE10302998C89C000822E1 /* Test */,
				653A257028338800005D4D48 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		653A257128338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplication" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				653A257228338800005D4D48 /* Debug */,
				2FEE10312998C89C000822E1 /* Test */,
				653A257328338800005D4D48 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		653A257428338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplicationTests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				653A257528338800005D4D48 /* Debug */,
				2FEE10322998C89C000822E1 /* Test */,
				653A257628338800005D4D48 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		653A257728338800005D4D48 /* Build configuration list for PBXNativeTarget "TemplateApplicationUITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				653A257828338800005D4D48 /* Debug */,
				2FEE10332998C89C000822E1 /* Test */,
				653A257928338800005D4D48 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		2F3D4ABA2A4E7C290068FB2F /* XCRemoteSwiftPackageReference "SpeziScheduler" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziScheduler.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.1.2;
			};
		};
		2F49B7742980407B00BCB272 /* XCRemoteSwiftPackageReference "Spezi" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/Spezi.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.8.0;
			};
		};
		2F66D20D2BB723180010D555 /* XCRemoteSwiftPackageReference "SwiftLint" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/realm/SwiftLint.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 0.56.0;
			};
		};
		2FB099B42A875E2B00B20952 /* XCRemoteSwiftPackageReference "HealthKitOnFHIR" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/HealthKitOnFHIR.git";
			requirement = {
				kind = upToNextMinorVersion;
				minimumVersion = 0.2.4;
			};
		};
		2FE5DC6229EDD883004B9AB4 /* XCRemoteSwiftPackageReference "SpeziAccount" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziAccount.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 2.1.3;
			};
		};
		2FE5DC6529EDD894004B9AB4 /* XCRemoteSwiftPackageReference "SpeziContact" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziContact.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.2;
			};
		};
		2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziFirebase.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 2.0.3;
			};
		};
		2FE5DC8229EDD934004B9AB4 /* XCRemoteSwiftPackageReference "SpeziQuestionnaire" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziQuestionnaire.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.2.3;
			};
		};
		2FE5DC8829EDD972004B9AB4 /* XCRemoteSwiftPackageReference "SpeziStorage" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziStorage.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 2.1.0;
			};
		};
		2FE5DC8D29EDD980004B9AB4 /* XCRemoteSwiftPackageReference "SpeziViews" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziViews.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.8.0;
			};
		};
		2FE5DC9029EDD9C3004B9AB4 /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/firebase/firebase-ios-sdk.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 11.0.0;
			};
		};
		2FE5DC9729EDD9D9004B9AB4 /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.2.1;
			};
		};
		2FE5DC9A29EDD9EF004B9AB4 /* XCRemoteSwiftPackageReference "XCTHealthKit" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTHealthKit.git";
			requirement = {
				kind = upToNextMinorVersion;
				minimumVersion = 1.1.1;
			};
		};
		5661551B2AB8384200209B80 /* XCRemoteSwiftPackageReference "swift-package-list" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/FelixHerrmann/swift-package-list";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 4.1.0;
			};
		};
		56E708332BB06B7100B08F0A /* XCRemoteSwiftPackageReference "SpeziLicense" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziLicense.git";
			requirement = {
				kind = upToNextMinorVersion;
				minimumVersion = 0.1.1;
			};
		};
		80C7B86E2D67DE6F0016BCAF /* XCRemoteSwiftPackageReference "SpeziHealthKit" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziHealthKit.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = "1.0.0-beta.3";
			};
		};
		97F466E62A76BBEE005DC9B4 /* XCRemoteSwiftPackageReference "SpeziOnboarding" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziOnboarding.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.2.1;
			};
		};
		A945FCD32C9C6BFA00B9EBC7 /* XCRemoteSwiftPackageReference "ResearchKitOnFHIR" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/ResearchKitOnFHIR.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 2.0.2;
			};
		};
		A94DDFFB2CBD1190004930BD /* XCRemoteSwiftPackageReference "SpeziNotifications" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziNotifications.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.2;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F3D4ABB2A4E7C290068FB2F /* SpeziScheduler */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F3D4ABA2A4E7C290068FB2F /* XCRemoteSwiftPackageReference "SpeziScheduler" */;
			productName = SpeziScheduler;
		};
		2F49B7752980407B00BCB272 /* Spezi */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F49B7742980407B00BCB272 /* XCRemoteSwiftPackageReference "Spezi" */;
			productName = Spezi;
		};
		2FB099AE2A875DF100B20952 /* FirebaseAuth */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC9029EDD9C3004B9AB4 /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseAuth;
		};
		2FB099B02A875DF100B20952 /* FirebaseFirestore */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC9029EDD9C3004B9AB4 /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseFirestore;
		};
		2FB099B52A875E2B00B20952 /* HealthKitOnFHIR */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FB099B42A875E2B00B20952 /* XCRemoteSwiftPackageReference "HealthKitOnFHIR" */;
			productName = HealthKitOnFHIR;
		};
		2FBD738B2A3BD150004228E7 /* SpeziScheduler */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziScheduler;
		};
		2FE5DC6329EDD883004B9AB4 /* SpeziAccount */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC6229EDD883004B9AB4 /* XCRemoteSwiftPackageReference "SpeziAccount" */;
			productName = SpeziAccount;
		};
		2FE5DC6629EDD894004B9AB4 /* SpeziContact */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC6529EDD894004B9AB4 /* XCRemoteSwiftPackageReference "SpeziContact" */;
			productName = SpeziContact;
		};
		2FE5DC7429EDD8E6004B9AB4 /* SpeziFirebaseAccount */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */;
			productName = SpeziFirebaseAccount;
		};
		2FE5DC7629EDD8E6004B9AB4 /* SpeziFirebaseConfiguration */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */;
			productName = SpeziFirebaseConfiguration;
		};
		2FE5DC7829EDD8E6004B9AB4 /* SpeziFirestore */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */;
			productName = SpeziFirestore;
		};
		2FE5DC8029EDD91D004B9AB4 /* SpeziOnboarding */ = {
			isa = XCSwiftPackageProductDependency;
			package = 97F466E62A76BBEE005DC9B4 /* XCRemoteSwiftPackageReference "SpeziOnboarding" */;
			productName = SpeziOnboarding;
		};
		2FE5DC8329EDD934004B9AB4 /* SpeziQuestionnaire */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC8229EDD934004B9AB4 /* XCRemoteSwiftPackageReference "SpeziQuestionnaire" */;
			productName = SpeziQuestionnaire;
		};
		2FE5DC8929EDD972004B9AB4 /* SpeziLocalStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC8829EDD972004B9AB4 /* XCRemoteSwiftPackageReference "SpeziStorage" */;
			productName = SpeziLocalStorage;
		};
		2FE5DC8E29EDD980004B9AB4 /* SpeziViews */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC8D29EDD980004B9AB4 /* XCRemoteSwiftPackageReference "SpeziViews" */;
			productName = SpeziViews;
		};
		2FE5DC9829EDD9D9004B9AB4 /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC9729EDD9D9004B9AB4 /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
		};
		2FE5DC9B29EDD9EF004B9AB4 /* XCTHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC9A29EDD9EF004B9AB4 /* XCRemoteSwiftPackageReference "XCTHealthKit" */;
			productName = XCTHealthKit;
		};
		56E708342BB06B7100B08F0A /* SpeziLicense */ = {
			isa = XCSwiftPackageProductDependency;
			package = 56E708332BB06B7100B08F0A /* XCRemoteSwiftPackageReference "SpeziLicense" */;
			productName = SpeziLicense;
		};
		56E7083A2BB06F6F00B08F0A /* SwiftPackageList */ = {
			isa = XCSwiftPackageProductDependency;
			package = 5661551B2AB8384200209B80 /* XCRemoteSwiftPackageReference "swift-package-list" */;
			productName = SwiftPackageList;
		};
		56E7083C2BB06FCA00B08F0A /* SwiftPackageListPlugin */ = {
			isa = XCSwiftPackageProductDependency;
			package = 5661551B2AB8384200209B80 /* XCRemoteSwiftPackageReference "swift-package-list" */;
			productName = "plugin:SwiftPackageListPlugin";
		};
		802D05732D679D1F002469F2 /* SpeziHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziHealthKit;
		};
		802D05752D679D1F002469F2 /* SpeziHealthKitUI */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziHealthKitUI;
		};
		80C7B86F2D67DE6F0016BCAF /* SpeziHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			package = 80C7B86E2D67DE6F0016BCAF /* XCRemoteSwiftPackageReference "SpeziHealthKit" */;
			productName = SpeziHealthKit;
		};
		80C7B8712D67DE6F0016BCAF /* SpeziHealthKitUI */ = {
			isa = XCSwiftPackageProductDependency;
			package = 80C7B86E2D67DE6F0016BCAF /* XCRemoteSwiftPackageReference "SpeziHealthKit" */;
			productName = SpeziHealthKitUI;
		};
		80CC1A2B2D678F5B008654B5 /* SpeziKeychainStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC8829EDD972004B9AB4 /* XCRemoteSwiftPackageReference "SpeziStorage" */;
			productName = SpeziKeychainStorage;
		};
		9739A0C52AD7B5730084BEA5 /* FirebaseStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC9029EDD9C3004B9AB4 /* XCRemoteSwiftPackageReference "firebase-ios-sdk" */;
			productName = FirebaseStorage;
		};
		97D73D692AD860AD00B47FA0 /* SpeziFirebaseStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */;
			productName = SpeziFirebaseStorage;
		};
		A94DDFFC2CBD1190004930BD /* SpeziNotifications */ = {
			isa = XCSwiftPackageProductDependency;
			package = A94DDFFB2CBD1190004930BD /* XCRemoteSwiftPackageReference "SpeziNotifications" */;
			productName = SpeziNotifications;
		};
		A994264D2CD25EB3002F8BD5 /* XCTSpeziAccount */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC6229EDD883004B9AB4 /* XCRemoteSwiftPackageReference "SpeziAccount" */;
			productName = XCTSpeziAccount;
		};
		A9947BEF2CC131ED0068AA8A /* SpeziSchedulerUI */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F3D4ABA2A4E7C290068FB2F /* XCRemoteSwiftPackageReference "SpeziScheduler" */;
			productName = SpeziSchedulerUI;
		};
		A9947BF32CC142BD0068AA8A /* XCTSpeziNotifications */ = {
			isa = XCSwiftPackageProductDependency;
			package = A94DDFFB2CBD1190004930BD /* XCRemoteSwiftPackageReference "SpeziNotifications" */;
			productName = XCTSpeziNotifications;
		};
		A9D83F952B083794000D0C78 /* SpeziFirebaseAccountStorage */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE5DC7329EDD8E6004B9AB4 /* XCRemoteSwiftPackageReference "SpeziFirebase" */;
			productName = SpeziFirebaseAccountStorage;
		};
		A9E1D3422C67A3F800CED217 /* SwiftLintBuildToolPlugin */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F66D20D2BB723180010D555 /* XCRemoteSwiftPackageReference "SwiftLint" */;
			productName = "plugin:SwiftLintBuildToolPlugin";
		};
		A9E1D3452C67B0A300CED217 /* SwiftLintBuildToolPlugin */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F66D20D2BB723180010D555 /* XCRemoteSwiftPackageReference "SwiftLint" */;
			productName = "plugin:SwiftLintBuildToolPlugin";
		};
		A9E1D3472C67B0A700CED217 /* SwiftLintBuildToolPlugin */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F66D20D2BB723180010D555 /* XCRemoteSwiftPackageReference "SwiftLint" */;
			productName = "plugin:SwiftLintBuildToolPlugin";
		};
/* End XCSwiftPackageProductDependency section */
	};
	rootObject = 653A2545283387FE005D4D48 /* Project object */;
}

================
File: TemplateApplicationTests/TemplateApplicationTests.swift
================
class TemplateApplicationTests: XCTestCase {
    func testContactsCount() throws {

================
File: TemplateApplicationUITests/ContactsTests.swift
================
class ContactsTests: XCTestCase {
    override func setUp() async throws {
        let app = XCUIApplication()
    func testContacts() throws {

================
File: TemplateApplicationUITests/ContributionsTest.swift
================
final class ContributionsTest: XCTestCase {
    override func setUp() async throws {
        let app = XCUIApplication()
    func testLicenseInformationPage() async throws {

================
File: TemplateApplicationUITests/OnboardingTests.swift
================
class OnboardingTests: XCTestCase {
    override func setUp() async throws {
        let app = XCUIApplication()
    func testOnboardingFlow() throws {
        let email = "leland@onboarding.stanford.edu"
    func testOnboardingFlowRepeated() throws {
    fileprivate func navigateOnboardingFlow(
    private func navigateOnboardingFlowWelcome() throws {
    private func navigateOnboardingFlowInterestingModules() throws {
    private func navigateOnboardingAccount(email: String) throws {
    private func navigateOnboardingFlowConsent() throws {
    private func navigateOnboardingFlowHealthKitAccess() throws {
    private func navigateOnboardingFlowNotification() throws {
    fileprivate func assertOnboardingComplete() {
        let tabBar = tabBars["Tab Bar"]
    fileprivate func assertAccountInformation(email: String) throws {
        let alert = "Are you sure you want to delete your account?"

================
File: TemplateApplicationUITests/SchedulerTests.swift
================
class SchedulerTests: XCTestCase {
    override func setUp() async throws {
        let app = XCUIApplication()
    func testScheduler() throws {
        let noButton = app.staticTexts["None of the time"]
        let nextButton = app.buttons["Next"]

================
File: .firebaserc
================
{
  "projects": {
    "default": "stanfordspezitemplateapp"
  }
}

================
File: .gitignore
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

# Swift Package Manager
*.xcodeproj
.swiftpm
.derivedData
.build
.docs
!TemplateApplication.xcodeproj

# IDE related folders
.idea

# Xcode
xcuserdata/
*.ipa
*.dSYM
*.dSYM.zip

# Other files
.DS_Store
.env

# Tests
report.junit
report.html
TemplateApplication.xcresult

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
firebase-debug.log*
firebase-debug.*.log*

# Firebase cache
.firebase/

# Swift Package List
TemplateApplication/package-list.json

================
File: .linkspector.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

dirs:
  - .
excludedFiles:
  - ./Scripts/TEMPLATEREADME.md
useGitIgnore: true
ignorePatterns:
  - pattern: '^doc:.*$'
replacementPatterns:
  - pattern: '(.*)#gh-dark-mode-only'
    replacement: '$1'
  - pattern: '(.*)#gh-light-mode-only'
    replacement: '$1'

================
File: .periphery.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

project: TemplateApplication.xcodeproj
schemes:
- TemplateApplication

================
File: .swiftlint.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

# The whitelist_rules configuration also includes rules that are enabled by default to provide a good overview of all rules.
only_rules:
  # All Images that provide context should have an accessibility label. Purely decorative images can be hidden from accessibility.
  - accessibility_label_for_image
  # Attributes should be on their own lines in functions and types, but on the same line as variables and imports.
  - attributes
  # Prefer using Array(seq) over seq.map { $0 } to convert a sequence into an Array.
  - array_init
  # Prefer the new block based KVO API with keypaths when using Swift 3.2 or later.
  - block_based_kvo
  # Non-constant variables should not be listed in a closure’s capture list to avoid confusion about closures capturing variables at creation time.
  - capture_variable
  # Delegate protocols should be class-only so they can be weakly referenced.
  - class_delegate_protocol
  # Closing brace with closing parenthesis should not have any whitespaces in the middle.
  - closing_brace
  # Closure bodies should not span too many lines.
  - closure_body_length
  # Closure end should have the same indentation as the line that started it.
  - closure_end_indentation
  # Closure parameters should be on the same line as opening brace.
  - closure_parameter_position
  # Closure expressions should have a single space inside each brace.
  - closure_spacing
  # Use commas to separate types in inheritance lists
  - comma_inheritance
  # Prefer at least one space after slashes for comments.
  - comment_spacing
  # All elements in a collection literal should be vertically aligned
  - collection_alignment
  # Colons should be next to the identifier when specifying a type and next to the key in dictionary literals.
  - colon
  # There should be no space before and one after any comma.
  - comma
  # The initializers declared in compiler protocols such as ExpressibleByArrayLiteral shouldn't be called directly.
  - compiler_protocol_init
  # Getter and setters in computed properties and subscripts should be in a consistent order.
  - computed_accessors_order
  # Conditional statements should always return on the next line
  - conditional_returns_on_newline
  # Prefer contains over comparing filter(where:).count to 0.
  - contains_over_filter_count
  # Prefer contains over using filter(where:).isEmpty
  - contains_over_filter_is_empty
  # Prefer `contains` over `first(where:) != nil`
  - contains_over_first_not_nil
  # Prefer contains over range(of:) != nil and range(of:) == nil
  - contains_over_range_nil_comparison
  # if, for, guard, switch, while, and catch statements shouldn't unnecessarily wrap their conditionals or arguments in parentheses.
  - control_statement
  # Types used for hosting only static members should be implemented as a caseless enum to avoid instantiation.
  - convenience_type
  # Complexity of function bodies should be limited.
  - cyclomatic_complexity
  # Availability checks or attributes shouldn’t be using older versions that are satisfied by the deployment target.
  - deployment_target
  # When registering for a notification using a block, the opaque observer that is returned should be stored so it can be removed later.
  - discarded_notification_center_observer
  # Discouraged direct initialization of types that can be harmful. e.g. UIDevice(), Bundle()
  - discouraged_direct_init
  # Prefer initializers over object literals.
  - discouraged_object_literal
  # Prefer non-optional booleans over optional booleans.
  - discouraged_optional_boolean
  # Prefer empty collection over optional collection.
  - discouraged_optional_collection
  # Dictionary literals with duplicated keys will crash in runtime.
  - duplicated_key_in_dictionary_literal
  # Duplicate Imports
  - duplicate_imports
  # Avoid using 'dynamic' and '@inline(__always)' together.
  - dynamic_inline
  # Prefer checking isEmpty over comparing collection to an empty array or dictionary literal.
  - empty_collection_literal
  # Prefer checking `isEmpty` over comparing `count` to zero.
  - empty_count
  # Arguments can be omitted when matching enums with associated types if they are not used.
  - empty_enum_arguments
  # Prefer () -> over Void ->.
  - empty_parameters
  # When using trailing closures, empty parentheses should be avoided after the method call.
  - empty_parentheses_with_trailing_closure
  # Prefer checking `isEmpty` over comparing string to an empty string literal.
  - empty_string
  # Empty XCTest method should be avoided.
  - empty_xctest_method
  # Number of associated values in an enum case should be low
  - enum_case_associated_values_count
  # Explicitly calling .init() should be avoided.
  - explicit_init
  # A fatalError call should have a message.
  - fatal_error_message
  # Files should not span too many lines.
  # See file_length below for the exact configuration.
  - file_length
  # File name should not contain any whitespace.
  - file_name_no_space
  # Specifies how the types within a file should be ordered.
  - file_types_order
  # Prefer using ``.first(where:)`` over ``.filter { }.first` in collections.
  - first_where
  # Prefer flatMap over map followed by reduce([], +).
  - flatmap_over_map_reduce
  # where clauses are preferred over a single if inside a for.
  - for_where
  # Force casts should be avoided.
  - force_cast
  # Force tries should be avoided.
  - force_try
  # Force unwrapping should be avoided.
  - force_unwrapping
  # Prefer to locate parameters with defaults toward the end of the parameter list.
  - function_default_parameter_at_end
  # Functions bodies should not span too many lines.
  # See function_body_length below for the exact configuration.
  - function_body_length
  # Number of function parameters should be low.
  # See function_parameter_count below for the exact configuration.
  - function_parameter_count
  # Generic type name should only contain alphanumeric characters, start with an uppercase character and span between 1 and 20 characters in length.
  - generic_type_name
  # Comparing two identical operands is likely a mistake.
  - identical_operands
  # Identifier names should only contain alphanumeric characters and start with a lowercase character or should only contain capital letters.
  # In an exception to the above, variable names may start with a capital letter when they are declared static and immutable.
  # Variable names should not be too long or too short. Excluded names are listed below.
  - identifier_name
  # Computed read-only properties and subscripts should avoid using the get keyword.
  - implicit_getter
  # Prefer implicit returns in closures.
  - implicit_return
  # Implicitly unwrapped optionals should be avoided when possible.
  - implicitly_unwrapped_optional
  # Identifiers should use inclusive language that avoids discrimination against groups of people based on race, gender, or socioeconomic status
  - inclusive_language
  # Prefer using Set.isDisjoint(with:) over Set.intersection(_:).isEmpty.
  - is_disjoint
  # Discouraged explicit usage of the default separator.
  - joined_default_parameter
  # Tuples shouldn't have too many members. Create a custom type instead.
  # See large_tuple below for the exact configuration.
  - large_tuple
  # Prefer using .last(where:) over .filter { }.last in collections.
  - last_where
  # Files should not contain leading whitespace.
  - leading_whitespace
  # CGGeometry: Struct extension properties and methods are preferred over legacy functions
  - legacy_cggeometry_functions
  # Struct-scoped constants are preferred over legacy global constants (CGSize, CGRect, NSPoint, ...).
  - legacy_constant
  # Swift constructors are preferred over legacy convenience functions (CGPointMake, CGSizeMake, UIOffsetMake, ...).
  - legacy_constructor
  # Prefer using the hash(into:) function instead of overriding hashValue
  - legacy_hashing
  # Prefer using the isMultiple(of:) function instead of using the remainder operator (%).
  - legacy_multiple
  # Struct extension properties and methods are preferred over legacy functions
  - legacy_nsgeometry_functions
  # Prefer Swift value types to bridged Objective-C reference types
  - legacy_objc_type
  # Prefer using type.random(in:) over legacy functions.
  - legacy_random
  # Lines should not span too many characters.
  # See line_length below for the exact configuration.
  - line_length
  # Array and dictionary literal end should have the same indentation as the line that started it.
  - literal_expression_end_indentation
  # Ensure definitions have a lower access control level than their enclosing parent
  - lower_acl_than_parent
  # MARK comment should be in valid format. e.g. '// MARK: ...' or '// MARK: - ...'
  - mark
  # Declarations should be documented.
  - missing_docs
  # Modifier order should be consistent.
  - modifier_order
  # Arguments should be either on the same line, or one per line.
  - multiline_arguments
  # Multiline arguments should have their surrounding brackets in a new line.
  - multiline_arguments_brackets
  # Chained function calls should be either on the same line, or one per line.
  - multiline_function_chains
  # Multiline literals should have their surrounding brackets in a new line.
  - multiline_literal_brackets
  # Functions and methods parameters should be either on the same line, or one per line.
  - multiline_parameters
  # Multiline parameters should have their surrounding brackets in a new line.
  - multiline_parameters_brackets
  # Types and functions should only be nested to a certain level deep.
  # See nesting below for the exact configuration.
  - nesting
  # Prefer Nimble operator overloads over free matcher functions.
  - nimble_operator
  # Prefer not to use extension access modifiers
  - no_extension_access_modifier
  # Fallthroughs can only be used if the case contains at least one other statement.  
  - no_fallthrough_only
  # Don’t add a space between the method name and the parentheses.
  - no_space_in_method_call
  # An object should only remove itself as an observer in deinit.
  - notification_center_detachment
  # Static strings should be used as key in NSLocalizedString in order to genstrings work.
  - nslocalizedstring_key
  # NSObject subclasses should implement isEqual instead of ==.
  - nsobject_prefer_isequal
  # Prefer object literals over image and color inits.
  - object_literal
  # Opening braces should be preceded by a single space and on the same line as the declaration.
  - opening_brace
  # Operators should be surrounded by a single whitespace when they are being used.
  - operator_usage_whitespace
  # Operators should be surrounded by a single whitespace when defining them.
  - operator_whitespace
  # Matching an enum case against an optional enum without ‘?’ is supported on Swift 5.1 and above.
  - optional_enum_case_matching
  # A doc comment should be attached to a declaration.
  - orphaned_doc_comment
  # Extensions shouldn’t override declarations.
  - override_in_extension
  # Some overridden methods should always call super
  - overridden_super_call
  # Combine multiple pattern matching bindings by moving keywords out of tuples.
  - pattern_matching_keywords
  # Prefer Self over type(of: self) when accessing properties or calling methods.
  - prefer_self_type_over_type_of_self
  # Prefer .zero over explicit init with zero parameters (e.g. CGPoint(x: 0, y: 0))
  - prefer_zero_over_explicit_init
  # Prefer private over fileprivate declarations.
  - private_over_fileprivate
  # Combine Subject should be private.
  - private_subject
  # Unit tests marked private are silently skipped.
  - private_unit_test
  # Creating views using Interface Builder should be avoided.
  - prohibited_interface_builder
  # Some methods should not call super (
    # NSFileProviderExtension: providePlaceholder(at:completionHandler:)
    # NSTextInput doCommand(by:)
    # NSView updateLayer()
    # UIViewController loadView())
  - prohibited_super_call
  # When declaring properties in protocols, the order of accessors should be get set.
  - protocol_property_accessors_order
  # Prefer using .allSatisfy() or .contains() over reduce(true) or reduce(false)
  - reduce_boolean
  # Prefer reduce(into:_:) over reduce(_:_:) for copy-on-write types
  - reduce_into
  # Prefer _ = foo() over let _ = foo() when discarding a result from a function.
  - redundant_discardable_let
  # nil coalescing operator is only evaluated if the lhs is nil, coalescing operator with nil as rhs is redundant
  - redundant_nil_coalescing
  # Objective-C attribute (@objc) is redundant in declaration.
  - redundant_objc_attribute
  # Initializing an optional variable with nil is redundant.
  - redundant_optional_initialization
  # Property setter access level shouldn't be explicit if it's the same as the variable access level.
  - redundant_set_access_control
  # String enum values can be omitted when they are equal to the enumcase name.
  - redundant_string_enum_value
  # Variables should not have redundant type annotation
  - redundant_type_annotation
  # Returning Void in a function declaration is redundant.
  - redundant_void_return
  # Return arrow and return type should be separated by a single space or on a separate line.
  - return_arrow_whitespace
  # Returning values from Void functions should be avoided.
  - return_value_from_void_function
  # Re-bind self to a consistent identifier name.
  - self_binding
  # Prefer shorthand operators (+=, -=, *=, /=) over doing the operation and assigning.
  - shorthand_operator
  # Test files should contain a single QuickSpec or XCTestCase class.
  - single_test_class
  # Prefer using `min()`` or `max()`` over `sorted().first` or `sorted().last`
  - sorted_first_last
  # Imports should be sorted.
  - sorted_imports
  # Else and catch should be on the same line, one space after the previous declaration.
  - statement_position
  # Operators should be declared as static functions, not free functions.
  - static_operator
  # SwiftLint ‘disable’ commands are superfluous when the disabled rule would not have triggered a violation in the disabled region. Use “ - ” if you wish to document a command.
  - superfluous_disable_command
  # Case statements should vertically align with their enclosing switch statement, or indented if configured otherwise.
  - switch_case_alignment
  # Shorthand syntactic sugar should be used, i.e. [Int] instead of Array.
  - syntactic_sugar
  # TODOs and FIXMEs should be resolved.
  - todo
  # Prefer someBool.toggle() over someBool = !someBool.
  - toggle_bool
  # Trailing closure syntax should be used whenever possible.
  - trailing_closure
  # Trailing commas in arrays and dictionaries should be avoided/enforced.
  - trailing_comma
  # Files should have a single trailing newline.
  - trailing_newline
  # Lines should not have trailing semicolons.
  - trailing_semicolon
  # Lines should not have trailing whitespace.
  # Ignored lines are specified below.
  - trailing_whitespace
  # Type bodies should not span too many lines.
  # See large_tuple below for the exact configuration.
  - type_body_length
  # Specifies the order of subtypes, properties, methods & more within a type.
  - type_contents_order
  # Type name should only contain alphanumeric characters, start with an uppercase character and span between 3 and 40 characters in length.
  # Excluded types are listed below.
  - type_name
  # Prefer using Array(seq) over seq.map { $0 } to convert a sequence into an Array.
  - typesafe_array_init
  # Use #unavailable/#available instead of #available/#unavailable with an empty body.
  - unavailable_condition
  # Unimplemented functions should be marked as unavailable.
  - unavailable_function
  # Avoid using unneeded break statements.
  - unneeded_break_in_switch
  # Parentheses are not needed when declaring closure arguments.
  - unneeded_parentheses_in_closure_argument
  # Prefer capturing references as weak to avoid potential crashes.
  - unowned_variable_capture
  # Catch statements should not declare error variables without type casting.
  - untyped_error_in_catch
  # Unused parameter in a closure should be replaced with _.
  - unused_closure_parameter
  # Unused control flow label should be removed.
  - unused_control_flow_label
  # Declarations should be referenced at least once within all files linted.
  - unused_declaration
  # When the index or the item is not used, .enumerated() can be removed.
  - unused_enumerated
  # All imported modules should be required to make the file compile.
  - unused_import
  # Prefer != nil over let _ =
  - unused_optional_binding
  # Setter value is not used.
  - unused_setter_value
  # @IBInspectable should be applied to variables only, have its type explicit and be of a supported type
  - valid_ibinspectable
  # Function parameters should be aligned vertically if they're in multiple lines in a declaration.
  - vertical_parameter_alignment
  # Function parameters should be aligned vertically if they're in multiple lines in a method call.
  - vertical_parameter_alignment_on_call
  # Limit vertical whitespace to a single empty line.
  # See vertical_whitespace below for the exact configuration.
  - vertical_whitespace
  # Don’t include vertical whitespace (empty line) before closing braces.
  - vertical_whitespace_closing_braces
  # Don’t include vertical whitespace (empty line) after opening braces.
  - vertical_whitespace_opening_braces
  # Using ternary to call Void functions should be avoided.
  - void_function_in_ternary
  # Prefer -> Void over -> ().
  - void_return
  # Delegates should be weak to avoid reference cycles.
  - weak_delegate
  # Prefer specific XCTest matchers over XCTAssertEqual and XCTAssertNotEqual
  - xct_specific_matcher
  # An XCTFail call should include a description of the assertion.
  - xctfail_message
  # The variable should be placed on the left, the constant on the right of a comparison operator.
  - yoda_condition

attributes:
  attributes_with_arguments_always_on_line_above: false

deployment_target: # Availability checks or attributes shouldn’t be using older versions that are satisfied by the deployment target.
  iOSApplicationExtension_deployment_target: 16.0
  iOS_deployment_target: 16.0

excluded: # paths to ignore during linting. Takes precedence over `included`.
  - .build
  - .swiftpm
  - .codeql
  - .derivedData

closure_body_length: # Closure bodies should not span too many lines.
  - 35 # warning - default: 20
  - 35 # error - default: 100

enum_case_associated_values_count: # Number of associated values in an enum case should be low
  - 5 # warning - default: 5
  - 5 # error - default: 6

file_length: # Files should not span too many lines.
  - 500 # warning - default: 400
  - 500 # error - default: 1000

function_body_length: # Functions bodies should not span too many lines.
  - 50 # warning - default: 40
  - 50 # error - default: 100

function_parameter_count: # Number of function parameters should be low.
  - 5 # warning - default: 5
  - 5 # error - default: 8

identifier_name:
  excluded: # excluded names
    - id
    - ok
    - or
    - p8
    - of
    - s3
    - at
    - to
    - in

large_tuple: # Tuples shouldn't have too many members. Create a custom type instead.
  - 2 # warning - default: 2
  - 2 # error - default: 3

line_length: # Lines should not span too many characters.
  warning: 150 # default: 120
  error: 150 # default: 200
  ignores_comments: true # default: false
  ignores_urls: true # default: false
  ignores_function_declarations: false # default: false
  ignores_interpolated_strings: true # default: false

nesting: # Types should be nested at most 2 level deep, and functions should be nested at most 5 levels deep.
  type_level:
    warning: 2 # warning - default: 1
  function_level:
    warning: 5 # warning - default: 5
    
trailing_closure:
  only_single_muted_parameter: true

type_body_length: # Type bodies should not span too many lines.
  - 250 # warning - default: 200
  - 250 # error - default: 200

type_name:
  excluded: # excluded names
    - ID

trailing_whitespace:
  ignores_empty_lines: true # default: false
  ignores_comments: true # default: false
  
unused_optional_binding:
  ignore_optional_try: true

vertical_whitespace: # Limit vertical whitespace to a single empty line.
  max_empty_lines: 2 # warning - default: 1

================
File: CITATION.cff
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

cff-version: 1.2.0
message: "If you use this software, please cite it as below."
authors:
- family-names: "Schmiedmayer"
  given-names: "Paul"
  orcid: "https://orcid.org/0000-0002-8607-9148"
- family-names: "Bauer"
  given-names: "Andreas"
  orcid: "https://orcid.org/0000-0002-1680-237X"
- family-names: "Zagar"
  given-names: "Philipp"
  orcid: "https://orcid.org/0009-0001-5934-2078"
- family-names: "Ravi"
  given-names: "Vishnu"
  orcid: "https://orcid.org/0000-0003-0359-1275"
- family-names: "Madlener"
  given-names: "Nikolai"
  orcid: "https://orcid.org/0009-0006-5059-6617"
- family-names: "Aalami"
  given-names: "Oliver"
  orcid: "https://orcid.org/0000-0002-7799-2429"
title: "Spezi Template Application"
doi: doi.org/10.5281/zenodo.7600783
url: "https://github.com/StanfordSpezi/SpeziTemplateApplication"

================
File: codecov.yml
================
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

codecov:
  branch: main
  require_ci_to_pass: true
comment:
  behavior: default
  layout: reach,diff,flags,files,footer
  require_changes: false
coverage:
  precision: 2
  range:
  - 70.0
  - 90.0
  round: up
  status:
    patch:
      default:
        target: auto
        threshold: 5.0
    project:
      default:
        target: auto
        threshold: 5.0
ignore:
- ^TemplateApplicationUITests.*
- ^TemplateApplicationTests.*
parsers:
  gcov:
    branch_detection:
      conditional: true
      loop: true
      macro: false
      method: false

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

Template Application Contributors
=================================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)
* [Philipp Zagar](https://github.com/philippzagar)
* [Nikolai Madlener](https://github.com/NikolaiMadlener)

================
File: firebase.json
================
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "storage": {
    "rules": "firebasestorage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "storage": {
      "port": 9199
    },
    "singleProjectMode": true
  }
}

================
File: firebasestorage.rules
================
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}

================
File: firestore.rules
================
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /users/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

================
File: LICENSE.md
================
MIT License

Copyright (c) 2023 Stanford University

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: README.md
================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

# Spezi Template Application

[![Beta Deployment](https://github.com/StanfordSpezi/SpeziTemplateApplication/actions/workflows/beta-deployment.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziTemplateApplication/actions/workflows/beta-deployment.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziTemplateApplication/branch/main/graph/badge.svg?token=9fvSAiFJUY)](https://codecov.io/gh/StanfordSpezi/SpeziTemplateApplication)
[![DOI](https://zenodo.org/badge/589846478.svg)](https://zenodo.org/badge/latestdoi/589846478)

This repository contains the Spezi Template Application.
It demonstrates using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication).

> [!NOTE] 
> Do you want to try out the Spezi Template Application? You can download it to your iOS device using [TestFlight](https://testflight.apple.com/join/ipEezBY1)!


## Application Content

The following screenshots show a wide variety of features based on Spezi Modules that are part of the Spezi Template Application.

|![A screen displaying welcome information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Welcome.png#gh-light-mode-only>) ![A screen displaying welcome information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Welcome~dark.png#gh-dark-mode-only>)|![A screen showing an overview of the modules used in the Spezi Template Application.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/InterestingModules.png#gh-light-mode-only>) ![A screen showing an overview of the modules used in the Spezi Template Application.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/InterestingModules~dark.png#gh-dark-mode-only>)|![A screen displaying the consent view.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Consent.png#gh-light-mode-only>) ![A screen displaying the consent view.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Consent~dark.png#gh-dark-mode-only>)
|:--:|:--:|:--:|
|Welcome View|Interesting Modules|Consent Signature|

|![HealthKit Onboarding Flow](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitAccess.png#gh-light-mode-only>) ![HealthKit Onboarding Flow](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitAccess~dark.png#gh-dark-mode-only>)|![Permissions screen of the HealthKit framework](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitSheet.png#gh-light-mode-only>) ![Permissions screen of the HealthKit framework](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitSheet~dark.png#gh-dark-mode-only>)|![Onboarding screen showing the Notifications permission screen.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Notifications.png#gh-light-mode-only>) ![Onboarding screen showing the Notifications permission screen.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Notifications~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|HealthKit Access|Granular HealthKit Share Control|Trigger Local Notifications|

|![A screen displaying the Scheduler UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Schedule.png#gh-light-mode-only>) ![A screen displaying the Scheduler UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Schedule~dark.png#gh-dark-mode-only>)|![A screen showing a questionnaire using ResearchKit.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Questionnaire.png#gh-light-mode-only>) ![A screen showing a questionnaire using ResearchKit.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Questionnaire~dark.png#gh-dark-mode-only>)|![The scheduler screen showing the completed UI](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/ScheduleComplete.png#gh-light-mode-only>) ![The scheduler screen showing the completed UI](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/ScheduleComplete~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|Schedule Tasks|Display Questionnaires|Keep Track of Tasks|

|![A screen displaying the Contact UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/Contacts.png#gh-light-mode-only>) ![A screen displaying the Contact UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/Contacts~dark.png#gh-dark-mode-only>)|![A screen displaying the current user account information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Account/Account.png#gh-light-mode-only>) ![A screen displaying the current user account information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Account/Account~dark.png#gh-dark-mode-only>)|![License information to list all used Swift Packages](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/License.png#gh-light-mode-only>) ![License information to list all used Swift Packages](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/License~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|Contact Information|Account Overview|License Information|

> [!NOTE] 
> You can find all the used Spezi Modules in the [Stanford Spezi GitHub Organization](https://github.com/StanfordSpezi).

The [DocC documentation of the Spezi Template Application contains information on how to use the application as the basis for your Spezi-based application, run the application, and modify the application](https://stanfordspezi.github.io/SpeziTemplateApplication).

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.

This project is based on [ContinuousDelivery Example by Paul Schmiedmayer](https://github.com/PSchmiedmayer/ContinousDelivery) and the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication) provided using the MIT license.


## License

This project is licensed under the MIT License. See [Licenses](LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)

================
File: TemplateApplication.xctestplan
================
{
  "configurations" : [
    {
      "id" : "6C9DABEF-5835-4523-A115-B83B0C6E3BBC",
      "name" : "Default",
      "options" : {

      }
    }
  ],
  "defaultOptions" : {
    "codeCoverage" : {
      "targets" : [
        {
          "containerPath" : "container:TemplateApplication.xcodeproj",
          "identifier" : "653A254C283387FE005D4D48",
          "name" : "TemplateApplication"
        }
      ]
    },
    "targetForVariableExpansion" : {
      "containerPath" : "container:TemplateApplication.xcodeproj",
      "identifier" : "653A254C283387FE005D4D48",
      "name" : "TemplateApplication"
    }
  },
  "testTargets" : [
    {
      "target" : {
        "containerPath" : "container:TemplateApplication.xcodeproj",
        "identifier" : "653A255C28338800005D4D48",
        "name" : "TemplateApplicationTests"
      }
    },
    {
      "target" : {
        "containerPath" : "container:TemplateApplication.xcodeproj",
        "identifier" : "653A256628338800005D4D48",
        "name" : "TemplateApplicationUITests"
      }
    }
  ],
  "version" : 1
}



================================================================
End of Codebase
================================================================
