Directory structure:
└── stanfordspezi-spezillm/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    ├── FogNode/
    │   └── README.md
    └── Sources/
        ├── SpeziLLM/
        │   └── SpeziLLM.docc/
        │       └── SpeziLLM.md
        ├── SpeziLLMFog/
        │   └── SpeziLLMFog.docc/
        │       └── SpeziLLMFog.md
        ├── SpeziLLMLocal/
        │   └── SpeziLLMLocal.docc/
        │       └── SpeziLLMLocal.md
        ├── SpeziLLMLocalDownload/
        │   └── SpeziLLMLocalDownload.docc/
        │       └── SpeziLLMLocalDownload.md
        └── SpeziLLMOpenAI/
            └── SpeziLLMOpenAI.docc/
                ├── FunctionCalling.md
                └── SpeziLLMOpenAI.md

================================================
File: README.md
================================================
<!--
                  
This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

# Spezi LLM

[![Build and Test](https://github.com/StanfordSpezi/SpeziLLM/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziLLM/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziLLM/branch/main/graph/badge.svg?token=pptLyqtoNR)](https://codecov.io/gh/StanfordSpezi/SpeziLLM)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7954213.svg)](https://doi.org/10.5281/zenodo.7954213)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziLLM%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziLLM)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziLLM%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziLLM)


## Overview

The Spezi LLM Swift Package includes modules that are helpful to integrate LLM-related functionality in your application.
The package provides all necessary tools for local LLM execution, the usage of remote OpenAI-based LLMs, as well as LLMs running on Fog node resources within the local network.

|<picture><source media="(prefers-color-scheme: dark)" srcset="Sources/SpeziLLMOpenAI/SpeziLLMOpenAI.docc/Resources/ChatView~dark.png"><img src="Sources/SpeziLLMOpenAI/SpeziLLMOpenAI.docc/Resources/ChatView.png" width="250" alt="Screenshot displaying the Chat View utilizing the OpenAI API from SpeziLLMOpenAI." /></picture>|<picture><source media="(prefers-color-scheme: dark)" srcset="Sources/SpeziLLMLocalDownload/SpeziLLMLocalDownload.docc/Resources/LLMLocalDownload~dark.png"><img src="Sources/SpeziLLMLocalDownload/SpeziLLMLocalDownload.docc/Resources/LLMLocalDownload.png" width="250" alt="Screenshot displaying the Local LLM Download View from SpeziLLMLocalDownload." /></picture>|<picture><source media="(prefers-color-scheme: dark)" srcset="Sources/SpeziLLMLocal/SpeziLLMLocal.docc/Resources/ChatView~dark.png"><img src="Sources/SpeziLLMLocal/SpeziLLMLocal.docc/Resources/ChatView.png" width="250" alt="Screenshot displaying the Chat View utilizing a locally executed LLM via SpeziLLMLocal." /></picture>|
|:--:|:--:|:--:|
|`OpenAI LLM Chat View`|`Language Model Download`|`Local LLM Chat View`|

## Setup

### 1. Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

### 2. Follow the setup steps of the individual targets

As Spezi LLM contains a variety of different targets for specific LLM functionalities, please follow the additional setup guide in the respective target section of this README.

## Targets

Spezi LLM provides a number of targets to help developers integrate LLMs in their Spezi-based applications:
- [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm): Base infrastructure of LLM execution in the Spezi ecosystem.
- [SpeziLLMLocal](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocal): Local LLM execution capabilities directly on-device. Enables running open-source LLMs from Hugging Face like [Meta's Llama2](https://ai.meta.com/llama/), [Microsoft's Phi](https://azure.microsoft.com/en-us/products/phi), [Google's Gemma](https://ai.google.dev/gemma), or [DeepSeek-R1](https://huggingface.co/deepseek-ai/DeepSeek-R1), among others. See [LLMLocalModel](https://swiftpackageindex.com/stanfordspezi/spezillm/main/documentation/spezillmlocal/llmlocalmodel) for a list of models tested with SpeziLLM.
- [SpeziLLMLocalDownload](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocaldownload): Download and storage manager of local Language Models, including onboarding views. 
- [SpeziLLMOpenAI](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmopenai): Integration with OpenAI's GPT models via using OpenAI's API service.
- [SpeziLLMFog](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmfog): Discover and dispatch LLM inference jobs to Fog node resources within the local network.

The section below highlights the setup and basic use of the [SpeziLLMLocal](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocal), [SpeziLLMOpenAI](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmopenai), and [SpeziLLMFog](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmfog) targets in order to integrate Language Models in a Spezi-based application. 

> [!NOTE]  
> To learn more about the usage of the individual targets, please refer to the [DocC documentation of the package](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation).

### Spezi LLM Local

The target enables developers to easily execute medium-size Language Models (LLMs) locally on-device. The module allows you to interact with the locally run LLM via purely Swift-based APIs, no interaction with low-level code is necessary, building on top of the infrastructure of the [SpeziLLM target](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm).

> [!IMPORTANT]  
> Spezi LLM Local is not compatible with simulators. The underlying [`mlx-swift`](https://github.com/ml-explore/mlx-swift) requires a modern Metal MTLGPUFamily and the simulator does not provide that.

> [!IMPORTANT]
> Important: To use the LLM local target, some LLMs require adding the *Increase Memory Limit* entitlement to the project.

#### Setup

You can configure the Spezi Local LLM execution within the typical `SpeziAppDelegate`.
In the example below, the `LLMRunner` from the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) target which is responsible for providing LLM functionality within the Spezi ecosystem is configured with the `LLMLocalPlatform` from the [SpeziLLMLocal](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocal) target. This prepares the `LLMRunner` to locally execute Language Models.

```swift
class TestAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            LLMRunner {
                LLMLocalPlatform()
            }
        }
    }
}
```

[SpeziLLMLocalDownload](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocaldownload) can be used to download an LLM from [HuggingFace](https://huggingface.co/) and save it on the device for execution. The `LLMLocalDownloadView` provides an out-of-the-box onboarding view for downloading models locally.

```swift
struct LLMLocalOnboardingDownloadView: View {
    var body: some View {
        LLMLocalDownloadView(
            model: .llama3_8B_4bit,
            downloadDescription: "The Llama3 8B model will be downloaded",
        ) {
            // Action to perform after the model is downloaded and the user presses the next button.
        }
    }
}
```

> [!TIP]
> The `LLMLocalDownloadView` view can be included in your onboarding process using SpeziOnboarding as [demonstrated in this example](https://swiftpackageindex.com/stanfordspezi/spezillm/main/documentation/spezillmlocaldownload/llmlocaldownloadview#overview).


#### Usage

The code example below showcases the interaction with local LLMs through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The `LLMLocalSchema` defines the type and configurations of the to-be-executed `LLMLocalSession`. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the `LLMLocalPlatform`. The inference via `LLMLocalSession/generate()` returns an `AsyncThrowingStream` that yields all generated `String` pieces.

```swift
struct LLMLocalDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMLocalSchema` to an `LLMLocalSession` via the `LLMRunner`.
                let llmSession: LLMLocalSession = runner(
                    with: LLMLocalSchema(
                        model: .llama3_8B_4bit,
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

The [`LLMChatViewSchema`](https://swiftpackageindex.com/stanfordspezi/spezillm/main/documentation/spezillm/llmchatviewschema) can be used to easily create a conversational chat interface for your chatbot application with a local LLM.

```swift
struct LLMLocalChatView: View {
    var body: some View {
        LLMChatViewSchema(
            with: LLMLocalSchema(
                model: .llama3_8B_4bit
            )
        )
    }
}
```

> [!NOTE]  
> To learn more about the usage of SpeziLLMLocal, please refer to the comprehensive [DocC documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocal).

### Spezi LLM Open AI

A module that allows you to interact with GPT-based Large Language Models (LLMs) from OpenAI within your Spezi application.
`SpeziLLMOpenAI` provides a pure Swift-based API for interacting with the OpenAI GPT API, building on top of the infrastructure of the [SpeziLLM target](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm).
In addition, `SpeziLLMOpenAI` provides developers with a declarative Domain Specific Language to utilize OpenAI function calling mechanism. This enables a structured, bidirectional, and reliable communication between the OpenAI LLMs and external tools, such as the Spezi ecosystem.

#### Setup

In order to use OpenAI LLMs within the Spezi ecosystem, the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) needs to be initialized in the Spezi `Configuration` with the `LLMOpenAIPlatform`. Only after, the `LLMRunner` can be used for inference of OpenAI LLMs.
See the [SpeziLLM documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) for more details.

```swift
import Spezi
import SpeziLLM
import SpeziLLMOpenAI

class LLMOpenAIAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            LLMRunner {
                LLMOpenAIPlatform()
            }
        }
    }
}
```

> [!IMPORTANT]
> If using `SpeziLLMOpenAI` on macOS, ensure to add the *`Keychain Access Groups` entitlement* to the enclosing Xcode project via *PROJECT_NAME > Signing&Capabilities > + Capability*. The array of keychain groups can be left empty, only the base entitlement is required.

#### Usage

The code example below showcases the interaction with an OpenAI LLM through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The `LLMOpenAISchema` defines the type and configurations of the to-be-executed `LLMOpenAISession`. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the `LLMOpenAIPlatform`. The inference via `LLMOpenAISession/generate()` returns an `AsyncThrowingStream` that yields all generated `String` pieces.

```swift
import SpeziLLM
import SpeziLLMOpenAI
import SwiftUI

struct LLMOpenAIDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMOpenAISchema` to an `LLMOpenAISession` via the `LLMRunner`.
                let llmSession: LLMOpenAISession = runner(
                    with: LLMOpenAISchema(
                        parameters: .init(
                            modelType: .gpt4_o,
                            systemPrompt: "You're a helpful assistant that answers questions from users.",
                            overwritingToken: "abc123"
                        )
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

> [!NOTE]  
> To learn more about the usage of SpeziLLMOpenAI, please refer to the [DocC documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmopenai).

### Spezi LLM Fog

The `SpeziLLMFog` target enables you to use LLMs running on [Fog node](https://en.wikipedia.org/wiki/Fog_computing) computing resources within the local network. The fog nodes advertise their services via [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS), enabling clients to discover all fog nodes serving a specific host within the local network.
`SpeziLLMFog` then dispatches LLM inference jobs dynamically to a random fog node within the local network and streams the response to surface it to the user.

> [!IMPORTANT]
> `SpeziLLMFog` requires a `SpeziLLMFogNode` within the local network hosted on some computing resource that actually performs the inference requests. `SpeziLLMFog` provides the `SpeziLLMFogNode` Docker-based package that enables an easy setup of these fog nodes. See the `FogNode` directory on the root level of the SPM package as well as the respective `README.md` for more details.

#### Setup

In order to use Fog LLMs within the Spezi ecosystem, the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) needs to be initialized in the Spezi `Configuration` with the `LLMFogPlatform`. Only after, the `LLMRunner` can be used for inference with Fog LLMs. See the [SpeziLLM documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) for more details.
The `LLMFogPlatform` needs to be initialized with the custom root CA certificate that was used to sign the fog node web service certificate (see the `FogNode/README.md` documentation for more information). Copy the root CA certificate from the fog node as resource to the application using `SpeziLLMFog` and use it to initialize the `LLMFogPlatform` within the Spezi `Configuration`.

```swift
class LLMFogAppDelegate: SpeziAppDelegate {
    private nonisolated static var caCertificateUrl: URL {
        // Return local file URL of root CA certificate in the `.crt` format
    }
    
    override var configuration: Configuration {
         Configuration {
             LLMRunner {
                // Set up the Fog platform with the custom CA certificate
                LLMRunner {
                    LLMFogPlatform(configuration: .init(caCertificate: Self.caCertificateUrl))
                }
            }
        }
    }
}
```

#### Usage

The code example below showcases the interaction with a Fog LLM through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The `LLMFogSchema` defines the type and configurations of the to-be-executed `LLMFogSession`. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the `LLMFogPlatform`. The inference via `LLMFogSession/generate()` returns an `AsyncThrowingStream` that yields all generated `String` pieces.
The `LLMFogSession` automatically discovers all available LLM fog nodes within the local network upon setup and the dispatches the LLM inference jobs to the fog computing resource, streaming back the response and surfaces it to the user.

> [!IMPORTANT]  
> The `LLMFogSchema` accepts a closure that returns an authorization token that is passed with every request to the Fog node in the `Bearer` HTTP field via the `LLMFogParameters/init(modelType:systemPrompt:authToken:)`. The token is created via the closure upon every LLM inference request, as the `LLMFogSession` may be long lasting and the token could therefore expire. Ensure that the closure appropriately caches the token in order to prevent unnecessary token refresh roundtrips to external systems.

```swift
struct LLMFogDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMFogSchema` to an `LLMFogSession` via the `LLMRunner`.
                let llmSession: LLMFogSession = runner(
                    with: LLMFogSchema(
                        parameters: .init(
                            modelType: .llama7B,
                            systemPrompt: "You're a helpful assistant that answers questions from users.",
                            authToken: {
                                // Return authorization token as `String` or `nil` if no token is required by the Fog node.
                            }
                        )
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

> [!NOTE]  
> To learn more about the usage of SpeziLLMFog, please refer to the [DocC documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmfog).

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziLLM/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)


================================================
File: CONTRIBUTORS.md
================================================
<!--
                  
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 
             
-->

SpeziLLM contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Vishnu Ravi](https://github.com/vishnuravi)
* [Philipp Zagar](https://github.com/philippzagar)
* [Adrit Rao](https://github.com/AdritRao)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================================================
File: FogNode/README.md
================================================
<!--
                  
This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

# SpeziLLMFog FogNode

Offers the functionality to dynamically dispatch LLM inference jobs from mobile devices to fog nodes within the local network that implement the OpenAI API.

## Overview

The client-side implementation of the fog execution environment is part of the Swift-based `SpeziLLM` package, specifically the [`SpeziLLMFog` target](https://swiftpackageindex.com/StanfordSpezi/SpeziLLM/documentation/spezillmfog).
On the other hand, the server-side implementation is a web service that offers LLM inference capabilities within the local network. This setup tutorial demonstrates how to set up the server-side fog node.

## Architecture

The SpeziLLM fog node offers LLM inference capabilities within the local network.
It consists of the following components:

- **LLM Inference capabilities**: The LLM inference is performed by the [Ollama open-source framework](https://github.com/ollama/ollama) that executes openly available LLMs such as [Llama2](https://ollama.com/library/llama2) or [Gemma](https://ollama.com/library/gemma). A full list of the available models can be found [here](https://ollama.com/library). The API surface of [Ollama mirrors the OpenAI API](https://github.com/ollama/ollama/blob/main/docs/openai.md), at least for basic inference requests.
- **Service advertisement**: As SpeziLLM intends to operate within a [fog computing environment](https://en.wikipedia.org/wiki/Fog_computing), the LLM execution resource (the LLM webservice) is advertised within the local network via [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS). On macOS, this is achieved via [Apple's Bonjour framework](https://developer.apple.com/bonjour), on Linux the [Avahi component](https://avahi.org/) is used (both of these services are interoperable with another). 
- **Secure local connections**: To ensure secure data transfer from and to the fog node within the local network, the [`traefik` reverse proxy](https://traefik.io/traefik/) only serves the LLM inference API via secure SSL connections. The TLS verification is achieved via a custom-issued [root CA certificate](https://en.wikipedia.org/wiki/Root_certificate) that signs the TLS certificate of the web service offering the LLM inference jobs. As these certificates need to be unique and secret, they are not part of the FogNode package but are rather generated by a script on the respective computing resource by the administrator (see setup instructions below)
- **User authentication**: The fog node requires user authentication by verifying the passed [Firebase User ID Bearer token](https://firebase.google.com/docs/auth/admin/verify-id-tokens) in the HTTP Authentication header. By default, the fog node only verifies the authenticity of the User ID token, not if the user is actually allowed to access the resource (this could be achieved by, e.g., custom claims in the token).
- **Packaging**: Lastly, as the fog node should be able to run on diverse platforms and the setup process should be as easy as possible, the entire fog component is packaged via [Docker](https://www.docker.com/).

## Setup

In order to correctly set up the Fog node, a couple of setup steps have to been taken. These steps are performed via the `setup.sh` shell script.

### Requirements

- Operating system: Either Linux or macOS
- [Docker Engine v25.0](https://docs.docker.com/engine/install/) as well as [Docker Compose v2](https://docs.docker.com/compose/install/)
- On macOS, one needs to use [Bonjour](https://developer.apple.com/bonjour) for mDNS advertisements (as Avahi only works on Linux distributions)

### Executing the setup script

The `setup.sh` script generates the custom CA root certificate as well as the web service certificate. They are persisted in the `ca` as well as `webservice` directories. Keep in mind that the application using the Fog Node (most likely via `SpeziLLMFog`) must trust this custom root CA certificate.
Once the script ran through, the last output of the script should be a warning about issuing the Firebase service account key via the Firebase console. Put the file within the `auth` directory under the name `serviceAccountKey.json`, it is then automatically picked up by the authorization service.

Lastly, start the container services via Docker Compose:
- On Linux, execute `docker compose --platform=linux up` to start the service, use the `-d` flag to run it in the background like: `docker compose --platform=linux up -d`. The service is automatically advertised by Avahi via mDNS from the Docker service.
- On macOS, run `docker compose up` to start the service. In addition, because of technical limitations of Avahi within a Docker container on macOS, one has to manually run the mDNS advertisement via Bonjour: `dns-sd -R "SpeziLLMFog Service" _https._tcp spezillmfog.local 443`. It advertises the service under the `spezillmfog.local` domain name with the `"SpeziLLMFog Service"` user-friendly name.

### Development

For development purposes, the `docker-compose.dev.yml` file starts up the fog node without TLS certificates and with the usage of the Firebase Emulator. In that case, one doesn't have to execute the setup script mentioned above (as no certificates are required without a TLS connection) and doesn't have to get the Firebase service account key from the Firebase Console.
In addition, this development compose file doesn't include an mDNS advertisement service. The developer is responsible for advertising the service. On macOS, which is the primary development environment for SpeziLLMFog, this can be done via Bonjour and the `dns-sd -R "SpeziLLMFog Service" _http._tcp spezillmfog.local 80` command. Note that the service advertises an `http` service with port 80, in contrast to the production setup with HTTPS and port 443 (secure traffic).

Another file for development purposes is the `docker-compose.avahi.yml` file. One container advertises an mDNS service via Avahi, another container discovers this service via an Avahi Sidecar. This setup is incredibly useful to test mDNS announcements on the Linux platform.

================================================
File: Sources/SpeziLLM/SpeziLLM.docc/SpeziLLM.md
================================================
# ``SpeziLLM``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Provides base Large Language Model (LLM) execution infrastructure within the Spezi ecosystem.

## Overview

The ``SpeziLLM`` target provides the base infrastructure for Large Language Model (LLM) execution within the Swift-based Spezi ecosystem. It contains necessary abstractions of LLMs that can be reused in an arbitrary context as well as a runner component handling the actual inference of the Language Model.

## Setup

### Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

## Spezi LLM Components

The two main components of ``SpeziLLM`` are the LLM abstractions which are composed of the ``LLMSchema``, ``LLMSession``, and ``LLMPlatform`` as well as the ``LLMRunner`` execution capability. The following section highlights the usage of these parts.

### LLM abstractions

``SpeziLLM`` provides three main parts abstracting LLMs:
- ``LLMSchema``: Configuration of the to-be-used LLM, containing all information necessary for the creation of an executable ``LLMSession``.
- ``LLMSession``: Executable version of the LLM containing context and state as defined by the ``LLMSchema``.
- ``LLMPlatform``: Responsible for turning the received ``LLMSchema`` to an executable ``LLMSession``.

These protocols provides an abstraction layer for the usage of Large Language Models within the Spezi ecosystem,
regardless of the execution locality (local or remote) or the specific model type.
Developers can use these protocols to conform their LLM interface implementations to a standard which is consistent throughout the Spezi ecosystem.

The actual inference logic as well as state is held within the ``LLMSession``. It requires implementation of the ``LLMSession/generate()`` as well as ``LLMSession/cancel()`` functions, starting and cancelling the inference by the LLM respectively.
In addition, it contains the ``LLMSession/context`` in which the entire conversational history with the LLM is held as well as the ``LLMSession/state`` describing the current execution state of the session. 

> Important: Any of the three aforementioned LLM abstractions shouldn't be used on it's own but always together with the ``LLMRunner``.
    Please refer to the ``LLMRunner`` documentation for a complete code example.

### LLM runner

The ``LLMRunner`` is a Spezi `Module` accessible via the SwiftUI `Environment` that handles the execution of Language Models in the Spezi ecosystem, regardless of their execution locality (represented by the ``LLMPlatform``) or the specific model type. 
A ``LLMRunner`` is responsible for turning a ``LLMSchema`` towards an executable and stateful ``LLMSession`` by using the underlying ``LLMPlatform``.

The ``LLMRunner`` is configured with the supported ``LLMPlatform``s, enabling the runner to delegate the LLM execution to the correct ``LLMPlatform``.

#### Setup

Before usage, the ``LLMRunner`` needs to be initialized in the Spezi `Configuration` with the supported ``LLMPlatform``s.

```swift
class LocalLLMAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            // Configure the runner responsible for executing LLMs.
            LLMRunner {
                // State the `LLMPlatform`s supported by the `LLMRunner`.
                LLMMockPlatform()
            }
        }
    }
}
```

#### Usage

The code section below showcases a complete, bare-bone code example on how to use the ``LLMRunner`` with the ``LLMSchema``.
The example is structured as a SwiftUI `View` with a `Button` to trigger LLM inference via the ``LLMMockSchema``. The generated output stream is displayed in a `Text` field.

- Tip: SpeziLLM provides the `@LLMSessionProvider` property wrapper (`View/LLMSessionProvider`) that drastically simplifies the state management of using the ``LLMSchema`` with the ``LLMRunner``. Refer to the docs below for more information.

```swift
struct LLMDemoView: View {
    // The runner responsible for executing the LLM.
    @Environment(LLMRunner.self) var runner

    // The LLM in execution, as defined by the ``LLMSchema``.
    @State var llmSession: LLMMockSession?
    @State var responseText = ""

    var body: some View {
        VStack {
            Button {
                Task {
                    try await executePrompt(prompt: "Hello LLM!")
                }
            } label: {
                Text("Start LLM inference")
            }
                .disabled(if: llmSession)

            Text(responseText)
        }
            .task {
                // Instantiate the `LLMSchema` to an `LLMSession` via the `LLMRunner`.
                self.llmSession = runner(with: LLMMockSchema())
            }
    }

    func executePrompt(prompt: String) async throws {
        await MainActor.run {
            llmSession?.context.append(userInput: prompt)
        }

        // Performing the LLM inference, returning a stream of outputs.
        guard let stream = try await llmSession?.generate() else {
            return
        }

        for try await token in stream {
            responseText.append(token)
        }
   }
}
```

As show in the example above, a simple LLM inference task with the ``LLMSession`` quickly becomes complex.
That's why SpeziLLM provides the `@LLMSessionProvider` property wrapper (`View/LLMSessionProvider`) that enables the convenient instantiation of the passed ``LLMSchema`` (defining the LLM) to a to-be-used ``LLMSession`` (LLM in execution).
The instantiation is done by the ``LLMRunner`` which determines the correct ``LLMPlatform`` for the ``LLMSchema`` to run on.
An example of using the `@LLMSessionProvider` property wrapper can be found below:

```swift
struct LLMDemoView: View {
    // Use the convenience property wrapper to instantiate the `LLMMockSession`
    @LLMSessionProvider(schema: LLMMockSchema()) var llm: LLMMockSession
    @State var responseText = ""

    var body: some View {
        VStack {
            Button {
                Task { @MainActor in
                    llm.context.append(userInput: "Hello!")

                    for try await token in try await llm.generate() {
                        responseText.append(token)
                    }
                }
            } label: {
                Text("Start LLM inference")
            }
                .disabled(llm.state.representation == .processing)

            Text(responseText)
        }
    }
}
```

### LLM Chat View

The ``LLMChatView`` and ``LLMChatViewSchema`` present basic chat views that enable users to chat with a Spezi LLM in a typical chat-like fashion. The input can be either typed out via the iOS keyboard or provided as voice input and transcribed into written text.
The ``LLMChatViewSchema`` takes an ``LLMSchema`` instance to define which LLM in what configuration should be used for the text inference.
The ``LLMChatView`` is passed an ``LLMSession`` that represents the LLM in execution containing state and context, and an optional `ChatView/ChatExportFormat` that defines the format of the to-be-exported `SpeziChat/Chat` (can be any of `.pdf`, `.text`, `.json`).

> Tip: The ``LLMChatView`` and ``LLMChatViewSchema`` build on top of the [SpeziChat package](https://swiftpackageindex.com/stanfordspezi/spezichat/documentation).
    For more details, please refer to the DocC documentation of the [`ChatView`](https://swiftpackageindex.com/stanfordspezi/spezichat/documentation/spezichat/chatview).

> Tip: By default, the ``LLMChatView`` presents no share button in the toolbar that exports the current `SpeziChat/Chat`. To add this element or change the export functionality, pass the desired export format for the `exportFormat` parameter in ``LLMChatView/init(session:exportFormat:)``.

#### Usage

An example usage of the ``LLMChatViewSchema`` can be seen in the following example.
The example uses the ``LLMMockSchema`` as the passed ``LLMSchema`` instance in order to provide a mock output generation stream.
Keep in mind that one cannot access the underlying context or state of the ``LLMSession`` when using the ``LLMChatViewSchema``.

```swift
struct LLMDemoChatView: View {
    var body: some View {
        LLMChatViewSchema(with: LLMMockSchema())
    }
}
```

An example of using the lower-level ``LLMChatView`` can be seen in the following example.
Here, the user has full control over the ``LLMSession`` and can access the context or state of the LLM.
SpeziLLM provides the `@LLMSessionProvider` property wrapper (`View/LLMSessionProvider`) that enables the convenient instantiation of the passed ``LLMSchema`` (defining the LLM) to a to-be-used ``LLMSession`` (LLM in execution).

```swift
struct LLMDemoChatView: View {
    // Use the convenience property wrapper to instantiate the `LLMMockSession`
    @LLMSessionProvider(schema: LLMMockSchema()) var llm: LLMMockSession

    var body: some View {
        LLMChatView(session: $llm)
    }
}
```

## Topics

### LLM abstraction

- ``LLMSchema``
- ``LLMSession``
- ``LLMState``
- ``LLMError``

### LLM Execution

- ``LLMRunner``
- ``LLMPlatform``

### Views

- ``LLMChatView``
- ``LLMChatViewSchema``

### Mocks

- ``LLMMockPlatform``
- ``LLMMockSchema``
- ``LLMMockSession``


================================================
File: Sources/SpeziLLMFog/SpeziLLMFog.docc/SpeziLLMFog.md
================================================
# ``SpeziLLMFog``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Discover and dispatch Large Language Models (LLMs) inference jobs to Fog node resources within the local network.

## Overview

A module that allows you to interact with Fog node-based Large Language Models (LLMs) in the local network within your Spezi application.
``SpeziLLMFog`` automatically discovers LLM computing resources within the local network, establishes a connection to these [Fog nodes](https://en.wikipedia.org/wiki/Fog_computing), and then dispatches LLM inference jobs to these nodes. The response is then streamed back to ``SpeziLLMFog`` and surfaced to the user. The fog nodes advertise their services via [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS), enabling clients to discover all fog nodes serving a specific host within the local network.
``SpeziLLMFog`` provides a pure Swift-based API for interacting with the Fog LLMs, building on top of the infrastructure of the [SpeziLLM target](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm).

## Setup

### Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

## Spezi LLM Fog Components

The core components of the ``SpeziLLMFog`` target are the ``LLMFogSchema``, ``LLMFogSession`` as well as ``LLMFogPlatform``. These components enable users to automatically discover Fog LLM resources via [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS) and dispatch jobs to these nodes which are then performing the LLM inference on open-source LLMs like Llama2 or Gemma.

> Important: ``SpeziLLMFog`` requires a `SpeziLLMFogNode` within the local network hosted on some computing resource that actually performs the inference requests. ``SpeziLLMFog`` provides the `SpeziLLMFogNode` Docker-based package that enables an out-of-the-box setup of these fog nodes. See the `FogNode` directory on the root level of the SPM package as well as the respective `README.md` for more details.

### LLM Fog

``LLMFogSchema`` offers a variety of configuration possibilities that are supported by the Fog LLM APIs (mirroring the OpenAI API implementation), such as the model type, the system prompt, the temperature of the model, and many more. These options can be set via the ``LLMFogSchema/init(parameters:modelParameters:injectIntoContext:)`` initializer and the ``LLMFogParameters`` and ``LLMFogModelParameters``.

This ``LLMFogSchema`` is then turned into an in-execution ``LLMFogSession`` by the `LLMRunner` via the ``LLMFogPlatform``. The ``LLMFogSession`` is the executable version of a Fog LLM containing context and state as defined by the ``LLMFogSchema``.
As the to-be-used models are running on a Fog node within the local network, the respective LLM computing resource (so the fog node) is discovered upon setup of the ``LLMFogSession``, meaning a ``LLMFogSession`` is bound to a specific fog node after initialization.

- Important: The Fog LLM abstractions shouldn't be used on it's own but always used together with the Spezi `LLMRunner`.

#### Setup

In order to use Fog LLMs within the Spezi ecosystem, the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) needs to be initialized in the Spezi `Configuration` with the `LLMFogPlatform`. Only after, the `LLMRunner` can be used for inference with Fog LLMs. See the [SpeziLLM documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) for more details.
The `LLMFogPlatform` needs to be initialized with the custom root CA certificate that was used to sign the fog node web service certificate (see the `FogNode/README.md` documentation for more information). Copy the root CA certificate from the fog node as resource to the application using `SpeziLLMFog` and use it to initialize the `LLMFogPlatform` within the Spezi `Configuration`.

```swift
class LLMFogAppDelegate: SpeziAppDelegate {
    private nonisolated static var caCertificateUrl: URL {
        // Return local file URL of root CA certificate in the `.crt` format
    }

    override var configuration: Configuration {
        Configuration {
            LLMRunner {
                LLMFogPlatform(configuration: .init(caCertificate: Self.caCertificateUrl))
            }
        }
    }
}
```

- Important: For development purposes, one is able to configure the fog node in the development mode, meaning no TLS connection (resulting in no need for custom certificates). See the `FogNode/README.md` for more details regarding server-side (so fog node) instructions.
On the client-side within Spezi, one has to pass `nil` for the `caCertificate` parameter of the ``LLMFogPlatform`` as shown above. If used in development mode, no custom CA certificate is required, ensuring a smooth and straightforward development process.

#### Usage

The code example below showcases the interaction with a Fog LLM through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The ``LLMFogSchema`` defines the type and configurations of the to-be-executed ``LLMFogSession``. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the ``LLMFogPlatform``. The inference via ``LLMFogSession/generate()`` returns an `AsyncThrowingStream` that yields all generated `String` pieces.
The ``LLMFogSession`` automatically discovers all available LLM fog nodes within the local network upon setup and the dispatches the LLM inference jobs to the fog computing resource, streaming back the response and surfaces it to the user.

The ``LLMFogSession`` contains the ``LLMFogSession/context`` property which holds the entire history of the model interactions. This includes the system prompt, user input, but also assistant responses.
Ensure the property always contains all necessary information, as the ``LLMFogSession/generate()`` function executes the inference based on the ``LLMFogSession/context``.

- Important: The ``LLMFogSchema`` accepts a closure that returns an authorization token that is passed with every request to the Fog node in the `Bearer` HTTP field via the ``LLMFogParameters/init(modelType:systemPrompt:authToken:)``. The token is created via the closure upon every LLM inference request, as the ``LLMFogSession`` may be long lasting and the token could therefore expire. Ensure that the closure appropriately caches the token in order to prevent unnecessary token refresh roundtrips to external systems.

```swift
struct LLMFogDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMFogSchema` to an `LLMFogSession` via the `LLMRunner`.
                let llmSession: LLMFogSession = runner(
                    with: LLMFogSchema(
                        parameters: .init(
                            modelType: .llama7B,
                            systemPrompt: "You're a helpful assistant that answers questions from users.",
                            authToken: { 
                                // Return authorization token as `String` or `nil` if no token is required by the Fog node.
                            }
                        )
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

## Topics

### LLM Fog abstraction

- ``LLMFogSchema``
- ``LLMFogSession``

### LLM Execution

- ``LLMFogPlatform``
- ``LLMFogPlatformConfiguration``

### LLM Configuration

- ``LLMFogParameters``
- ``LLMFogModelParameters``

### Misc

- ``LLMFogError``


================================================
File: Sources/SpeziLLMLocal/SpeziLLMLocal.docc/SpeziLLMLocal.md
================================================
# ``SpeziLLMLocal``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Provides local Language Model execution capabilities on-device.

## Overview


The ``SpeziLLMLocal`` target enables the usage of locally executed Language Models (LLMs) directly on-device, without the need for any kind of internet connection and no data every leaving the local device. The underlying technology used for the LLM inference is [`mlx-swift`](https://github.com/ml-explore/mlx-swift). ``SpeziLLMLocal`` provides a pure Swift-based API for interacting with the locally executed model, building on top of the infrastructure of the [SpeziLLM target](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm).

## Setup

### Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.
 
> Important: Spezi LLM Local is not compatible with simulators. The underlying [`mlx-swift`](https://github.com/ml-explore/mlx-swift) requires a modern Metal MTLGPUFamily and the simulator does not provide that.

> Important: To use the LLM local target, some LLMs require adding the *Increase Memory Limit* entitlement to the project.

## Spezi LLM Local Components

The core components of the ``SpeziLLMLocal`` target are ``LLMLocalSchema``, ``LLMLocalSession`` as well as ``LLMLocalPlatform``. They heavily utilize [mlx-swift-examples](https://github.com/ml-explore/mlx-swift-examples) to perform the inference of the Language Model. ``LLMLocalSchema`` defines the type and configuration of the LLM, ``LLMLocalSession`` represents the ``LLMLocalSchema`` in execution while ``LLMLocalPlatform`` is the LLM execution platform.

> Important: To execute a LLM locally, the model file must be present on the local device.

> Tip: In order to download the model file of the Language model to the local device, SpeziLLM provides the [SpeziLLMLocalDownload](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillmlocaldownload) target which provides model download and storage functionalities.

``LLMLocalSchema`` offers a variety of configuration possibilities, such as the used model file, the context window, the maximum output size or the batch size. These options can be set via the ``LLMLocalSchema/init(model:parameters:samplingParameters:injectIntoContext:)`` initializer and the ``LLMLocalParameters``, and ``LLMLocalSamplingParameters`` types.

- Important: ``LLMLocalSchema``, ``LLMLocalSession`` as well as ``LLMLocalPlatform`` shouldn't be used on it's own but always used together with the Spezi `LLMRunner`!

### Setup

In order to use local LLMs within Spezi, the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) needs to be initialized in the Spezi `Configuration` with the ``LLMLocalPlatform``. Only after, the `LLMRunner` can be used to execute LLMs locally.
See the [SpeziLLM documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) for more details.

```swift
class LocalLLMAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            LLMRunner {
                LLMLocalPlatform()
            }
        }
    }
}
```

### Usage

The code example below showcases the interaction with the local LLM abstractions through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The ``LLMLocalSchema`` defines the type and configurations of the to-be-executed ``LLMLocalSession``. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the ``LLMLocalPlatform``. The inference via ``LLMLocalSession/generate()`` returns an `AsyncThrowingStream` that yields all generated `String` pieces.

The ``LLMLocalSession`` contains the ``LLMLocalSession/context`` property which holds the entire history of the model interactions. This includes the system prompt, user input, but also assistant responses.
Ensure the property always contains all necessary information, as the ``LLMLocalSession/generate()`` function executes the inference based on the ``LLMLocalSession/context``.

> Important: The local LLM abstractions should only be used together with the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner)!

```swift
struct LLMLocalDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMLocalSchema` to an `LLMLocalSession` via the `LLMRunner`.
                let llmSession: LLMLocalSession = runner(
                    with: LLMLocalSchema(
                        model: .llama3_1_8B_4bit
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

## Topics

### LLM Local abstraction

- ``LLMLocalSchema``
- ``LLMLocalSession``

### LLM Execution

- ``LLMLocalPlatform``
- ``LLMLocalPlatformConfiguration``

### LLM Configuration

- ``LLMLocalParameters``
- ``LLMLocalSamplingParameters``

### Misc

- ``LLMLocalError``


================================================
File: Sources/SpeziLLMLocalDownload/SpeziLLMLocalDownload.docc/SpeziLLMLocalDownload.md
================================================
# ``SpeziLLMLocalDownload``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Provides download and storage functionality for Large Language Models (LLMs).

## Overview

The ``SpeziLLMLocalDownload`` target provides download and storage functionality for Large Language Models (LLMs) to the local device in the Spezi ecosystem. As Language Models typically have big file sizes and therefore long transmission times, the download process has to be properly managed with care. ``SpeziLLMLocalDownload`` offers reusable view- and manager components for developers to easily achieve their desired local LLM setup process in an application.

## Setup

### Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

## Spezi LLM Local Download Components

The two main components of ``SpeziLLMLocalDownload`` are the ``LLMLocalDownloadView`` providing an out-of-the-box onboarding view to download large models and the ``LLMLocalDownloadManager`` that contains all the logic for the model download and local storage.

### Download View

The ``LLMLocalDownloadView`` provides an out-of-the-box onboarding view for downloading locally executed [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) LLMs to the device.
It can be combined with the [SpeziOnboarding](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation) [`OnboardingStack`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingstack) to create an easy onboarding flow within the application.
The ``LLMLocalDownloadView`` automatically checks if the model already exists on disk, and if not, offers the start of the download via a button click. The download process itself includes the presentation of a percentage progress view in order to give the user a better feeling for the download progress.

The ``LLMLocalDownloadView/init(model:downloadDescription:action:)-4a14v`` initializer accepts a download description displayed in the view, the remote download `URL` of the LLM, the local storage `URL` of the downloaded model, as well as an action closure to move onto the next (onboarding) step.

The heavy lifting of downloading and storing the model is done by the ``LLMLocalDownloadManager`` which exposes the current downloading state view the ``LLMLocalDownloadManager/state`` property of type ``LLMLocalDownloadManager/DownloadState``.

#### Usage

The code example below creates an onboarding flow via the [SpeziOnboarding](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation) [`OnboardingStack`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingstack) that downloads and stores an Language Model on the local device via the use of the ``LLMLocalDownloadView``.

```swift
struct LLMLocalDownloadApp: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            LLMLocalOnboardingDownloadView()
        }
    }
}
```

```swift
struct LLMLocalOnboardingDownloadView: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath

    var body: some View {
        LLMLocalDownloadView(
            model: .llama3_8B_4bit,
            downloadDescription: "The Llama3 8B model will be downloaded"
        ) {
            onboardingNavigationPath.nextStep()
        }
    }
}
```

### Download Manager

The ``LLMLocalDownloadManager`` manages the download and storage of Large Language Models to the local device.

One configures the ``LLMLocalDownloadManager`` via the ``LLMLocalDownloadManager/init(model:)`` initializer,
passing a download `URL` as well as a local storage `URL` to the ``LLMLocalDownloadManager``.
The download of a model is started via ``LLMLocalDownloadManager/startDownload()`` and can be cancelled (early) via ``LLMLocalDownloadManager/cancelDownload()``.

The current state of the ``LLMLocalDownloadManager`` is exposed via the ``LLMLocalDownloadManager/state`` property which
is of type ``LLMLocalDownloadManager/DownloadState``, containing states such as ``LLMLocalDownloadManager/DownloadState/downloading(progress:)`` which includes the progress of the download or ``LLMLocalDownloadManager/DownloadState/downloaded`` which indicates that the download has finished.

## Topics

### Views

- ``LLMLocalDownloadView``

### Operations

- ``LLMLocalDownloadManager``


================================================
File: Sources/SpeziLLMOpenAI/SpeziLLMOpenAI.docc/FunctionCalling.md
================================================
# Function Calling

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Function calling with LLMs from OpenAI.

## Overview

The OpenAI GPT-based LLMs provide [function calling capabilities](https://platform.openai.com/docs/guides/function-calling) in order to enable a structured, bidirectional, and reliable communication between the OpenAI LLMs and external tools, such as the Spezi ecosystem. <!-- markdown-link-check-disable-line -->
``SpeziLLMOpenAI`` provides a declarative Domain Specific Language to make LLM function calling as seamless as possible within Spezi.

## Usage

The function calling mechanism reflected within the DSL of ``SpeziLLMOpenAI`` consists of two main components: The ``LLMFunction``, serving as a representative of the to-be executed function, and the ``LLMFunction/Parameter``s, declaring which parameters the ``LLMFunction`` receives from the LLM upon execution.

The crucial properties of a ``LLMFunction`` are the ``LLMFunction/name``, serving as the identifier of the function, as well as the ``LLMFunction/description``, enabling the LLM to understand the purpose of the available function call.
The actual logic that is executed upon a function call by the LLM resides in the ``LLMFunction/execute()`` function.
``LLMFunction/execute()`` returns a `String?`, containing all the information the Spezi application wants to provide to the LLM upon a function call, and is automatically injected into the LLM conversation by ``SpeziLLMOpenAI``.

The ``LLMFunction/Parameter`` property wrapper (`@Parameter`) can be used within an ``LLMFunction`` to declare that the function takes a number of arguments of specific type.
As the function is called by the LLM, the function parameters that are sent by the LLM are automatically injected into the ``LLMFunction`` by ``SpeziLLMOpenAI``.
The wrapper contains various initializers for the respective wrapped types of the parameter, such as `Int`, `Float`, `Double`, `Bool` or `String`, as well as `Optional`, `array`, and `enum` data types.
For these types, ``SpeziLLMOpenAI`` is able to automatically synthezise the OpenAI function parameter schema from the declared ``LLMFunction/Parameter``s.

> Tip: In case developers want to manually define schema's for custom and complex types, please refer to ``LLMFunctionParameter``, ``LLMFunctionParameterEnum``, and ``LLMFunctionParameterArrayElement``.

The available ``LLMFunction``s are then declared via ``LLMOpenAI/init(parameters:modelParameters:_:)`, enabling the LLM to pick relevant functions and call them in order to receive more information or execute a specific programatic functionality.

### Example

A full code example of using a ``LLMFunction`` using the ``LLMOpenAISchema`` (configuration of the LLM) can be found below.
As LLMs cannot access real time information, the OpenAI model is provided with a weather ``LLMFunction``, enabling the LLM to fetch up-to-date weather information for a specific location.

```swift
// The defined `LLMFunction` made available to the OpenAI LLM
struct WeatherFunction: LLMFunction {
    static let name: String = "get_current_weather"
    static let description: String = "Get the current weather in a given location"

    @Parameter(description: "The city and state of the to be determined weather, e.g. San Francisco, CA")
    var location: String

    func execute() async throws -> String? {
        "The weather at \(location) is 30 degrees"
    }
}

// Enclosing view to display an LLM chat
struct LLMOpenAIChatTestView: View {
    private let schema = LLMOpenAISchema(
        parameters: .init(
            modelType: .gpt4_o,
            systemPrompt: "You're a helpful assistant that answers questions from users."
        )
    ) {
        WeatherFunction()   // State which LLM functions are made available to the OpenAI LLM
    }

    var body: some View {
        LLMChatView(
            schema: schema
        )
    }
}
```

One can even argue that the LLM should be able to request the weather in a specific measuring scale.
This can be achieved by adding a second parameter, in this case a `String`-based `enum`, to the ``LLMFunction``.
The `enum` type has to conform to the ``LLMFunctionParameterEnum`` protocol and needs to be `String`-based (so the `RawValue` must be a `String`).

```swift
struct LLMOpenAIFunctionWeather: LLMFunction {
    // The `enum`-based type used as a function call parameter
    enum TemperatureUnit: String, LLMFunctionParameterEnum {
        case celsius
        case fahrenheit
    }
    
    static let name: String = "get_current_weather"
    static let description: String = "Get the current weather in a given location"
    
    @Parameter(description: "The city and state of the to be determined weather, e.g. San Francisco, CA")
    var location: String
    @Parameter(description: "The unit of the temperature")
    var unit: TemperatureUnit   // Specify the `enum`-based type as a parameter
    
    func execute() async throws -> String? {
        "The weather at \(location) is 30 degrees \(unit)"
    }
}
```

In addition to that, the ``LLMFunction/Parameter`` also enables the usage of `array`-based types with primitive array element types (such as `Int`s or `String`s) out of the box.
This can be incredibly useful if the specific use case requires the LLM to request lots of data from the client.

An example use case for this feature within the health context can be found in the example below.
The LLM is able to request specific types of health data which is then returned by the function call.

```swift
struct LLMOpenAIFunctionHealthData: LLMFunction {
    static let name: String = "get_health_data"
    static let description: String = "Get the health data of a patient based on health data types."
    
    @Parameter(description: "The types of health data that are requested", enum: ["allergies", "medications"])
    var healthDataTypes: [String]   // Use an `array` of `String`s as parameter
    
    func execute() async throws -> String? {
        var healthData = ""
        
        if healthDataTypes.contains(where: { $0 == "allergies" }) {
            healthData += "The patient has an allergy against nuts. "
        }
        if healthDataTypes.contains(where: { $0 == "medications" }) {
            healthData += "The patient takes painkillers twice a day. "
        }
        
        return healthData
    }
}
```

> Tip: In case one wants to use complex custom objects within the ``LLMFunction/Parameter``, one can use ``LLMFunctionParameter`` for regular types and ``LLMFunctionParameterArrayElement`` for `array`-based types to manually specify the conformance of Swift types to the [OpenAI Function calling schema](https://platform.openai.com/docs/guides/function-calling). See the inline DocC documentation for further information. <!-- markdown-link-check-disable-line -->

## Topics

### LLM functions

- ``LLMFunction``
- ``LLMFunction/Parameter``
- ``LLMFunctionBuilder``

### Function Parameters

- ``LLMFunctionParameter``
- ``LLMFunctionParameterEnum``
- ``LLMFunctionParameterArrayElement``


================================================
File: Sources/SpeziLLMOpenAI/SpeziLLMOpenAI.docc/SpeziLLMOpenAI.md
================================================
# ``SpeziLLMOpenAI``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Interact with Large Language Models (LLMs) from OpenAI.

## Overview

A module that allows you to interact with GPT-based Large Language Models (LLMs) from OpenAI within your Spezi application.
``SpeziLLMOpenAI`` provides a pure Swift-based API for interacting with the OpenAI GPT API, building on top of the infrastructure of the [SpeziLLM target](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm).

@Row {
    @Column {
        @Image(source: "LLMOpenAIAPITokenOnboardingStep", alt: "Screenshot displaying the OpenAI API Token Onboarding view from Spezi OpenAI") {
            ``LLMOpenAIAPITokenOnboardingStep``
        }
    }
    @Column {
        @Image(source: "LLMOpenAIModelOnboardingStep", alt: "Screenshot displaying the Open AI Model Selection Onboarding Step"){
            ``LLMOpenAIModelOnboardingStep``
        }
    }
    @Column {
        @Image(source: "ChatView", alt: "Screenshot displaying the usage of the LLMOpenAI with the SpeziChat Chat View."){
            ``LLMOpenAISession``
        }
    }
}

## Setup

### Add Spezi LLM as a Dependency

You need to add the SpeziLLM Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

## Spezi LLM OpenAI Components

The core components of the ``SpeziLLMOpenAI`` target are the ``LLMOpenAISchema``, ``LLMOpenAISession`` as well as ``LLMOpenAIPlatform``. They heavily use the OpenAI API to perform textual inference on the GPT-3.5 or GPT-4 models from OpenAI.

> Important: To utilize an LLM from OpenAI, an OpenAI API Key is required. Ensure that the OpenAI account associated with the key has enough resources to access the specified model as well as enough credits to perform the actual inference.

> Tip: In order to collect the OpenAI API Key or model type from the user, ``SpeziLLMOpenAI`` provides the ``LLMOpenAIAPITokenOnboardingStep`` and ``LLMOpenAIModelOnboardingStep`` views which can be used in the onboarding flow of the application.

### LLM OpenAI

``LLMOpenAISchema`` offers a variety of configuration possibilities that are supported by the OpenAI API, such as the model type, the system prompt, the temperature of the model, and many more. These options can be set via the ``LLMOpenAISchema/init(parameters:modelParameters:injectIntoContext:_:)`` initializer and the ``LLMOpenAIParameters`` and ``LLMOpenAIModelParameters``.

- Important: The OpenAI LLM abstractions shouldn't be used on it's own but always used together with the Spezi `LLMRunner`.

#### Setup

In order to use OpenAI LLMs, the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) needs to be initialized in the Spezi `Configuration` with the ``LLMOpenAIPlatform``. Only after, the `LLMRunner` can be used to do inference via OpenAI LLMs.
See the [SpeziLLM documentation](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) for more details.

```swift
import Spezi
import SpeziLLM
import SpeziLLMOpenAI

class LLMOpenAIAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
         Configuration {
             LLMRunner {
                LLMOpenAIPlatform()
            }
        }
    }
}
```

#### Usage

The code example below showcases the interaction with the OpenAI LLMs within the Spezi ecosystem through the the [SpeziLLM](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm) [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner), which is injected into the SwiftUI `Environment` via the `Configuration` shown above.

The ``LLMOpenAISchema`` defines the type and configurations of the to-be-executed ``LLMOpenAISession``. This transformation is done via the [`LLMRunner`](https://swiftpackageindex.com/stanfordspezi/spezillm/documentation/spezillm/llmrunner) that uses the ``LLMOpenAIPlatform``. The inference via ``LLMOpenAISession/generate()`` returns an `AsyncThrowingStream` that yields all generated `String` pieces.

The ``LLMOpenAISession`` contains the ``LLMOpenAISession/context`` property which holds the entire history of the model interactions. This includes the system prompt, user input, but also assistant responses.
Ensure the property always contains all necessary information, as the ``LLMOpenAISession/generate()`` function executes the inference based on the ``LLMOpenAISession/context``

```swift
import SpeziLLM
import SpeziLLMOpenAI
import SwiftUI

struct LLMOpenAIDemoView: View {
    @Environment(LLMRunner.self) var runner
    @State var responseText = ""

    var body: some View {
        Text(responseText)
            .task {
                // Instantiate the `LLMOpenAISchema` to an `LLMOpenAISession` via the `LLMRunner`.
                let llmSession: LLMOpenAISession = runner(
                    with: LLMOpenAISchema(
                        parameters: .init(
                            modelType: .gpt3_5Turbo,
                            systemPrompt: "You're a helpful assistant that answers questions from users.",
                            overwritingToken: "abc123"
                        )
                    )
                )

                do {
                    for try await token in try await llmSession.generate() {
                        responseText.append(token)
                    }
                } catch {
                    // Handle errors here. E.g., you can use `ViewState` and `viewStateAlert` from SpeziViews.
                }
            }
    }
}
```

#### LLM Function Calling

The OpenAI GPT-based LLMs provide function calling capabilities in order to enable a structured, bidirectional, and reliable communication between the OpenAI LLMs and external tools, such as the Spezi ecosystem.
``SpeziLLMOpenAI`` provides a declarative Domain Specific Language to make LLM function calling as seamless as possible within Spezi.
An extensive documentation can be found in <doc:FunctionCalling>.

### Onboarding Flow

The ``LLMOpenAIAPITokenOnboardingStep`` provides a view that can be used for the user to enter an OpenAI API key during onboarding in your Spezi application. The example below showcases of how to can add an OpenAI onboarding step within an application created from the Spezi Template Application below.

First, create a new view to show the onboarding step:

```swift
import SpeziLLMOpenAI
import SpeziOnboarding
import SwiftUI

struct OpenAIAPIKey: View {
    @Environment(OnboardingNavigationPath.self) private var onboardingNavigationPath: OnboardingNavigationPath
    
    var body: some View {
        LLMOpenAIAPITokenOnboardingStep {
            onboardingNavigationPath.nextStep()
        }
    }
}
```

This view can then be added to the `OnboardingFlow` within the Spezi Template Application:

```swift
import SpeziOnboarding
import SwiftUI

struct OnboardingFlow: View {
    @AppStorage(StorageKeys.onboardingFlowComplete) var completedOnboardingFlow = false
    
    var body: some View {
        OnboardingStack(onboardingFlowComplete: $completedOnboardingFlow) {
            // ... other steps
            OpenAIAPIKey()
            // ... other steps
        }
    }
}
```

Now the OpenAI API Key entry view will appear within your application's onboarding process. The API Key entered will be persisted across application launches.

## Topics

### LLM OpenAI abstraction

- ``LLMOpenAISchema``
- ``LLMOpenAISession``

### LLM Execution

- ``LLMOpenAIPlatform``
- ``LLMOpenAIPlatformConfiguration``

### Onboarding

- ``LLMOpenAIAPITokenOnboardingStep``
- ``LLMOpenAIModelOnboardingStep``
- ``LLMOpenAITokenSaver``

### LLM Configuration

- ``LLMOpenAIParameters``
- ``LLMOpenAIModelParameters``

### Misc

- ``LLMOpenAIError``


