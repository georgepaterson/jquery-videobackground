# Browser support

## Purpose of this document

This document is designed to provide a template for agreeing development deliverables with the client. It is structured to be a modular document where sections can be updated or removed depending on the requirements of the project. [[1](#note-1)]

## Development approach

Our development approach is based on internationally recognised standards and best practice to create accessible, modular, scalable and performant code. By basing our approach on international standards we aim to develop an inclusive experience for all web users; where access to functionality and content is of primary importance and design is used to enhance that experience.

## Understanding support

Access to the Web is as diverse as it's users and in providing support we aim to make Web functionality and content as accessible as possible. Providing support is not about forcing the same visual and behavioural experience across different browsers, where different browsers may have varying capabilities and users may have different requirements. To force a specific experience will prevent users accessing functionality and content.

To identify the level of support we can provide a browser, we grade browsers by the experience they are capable of providing the user.

Where requested we can also [analyse client data](#client-data) and identify specific [client requirements](#client-requirements) to modify the standard [graded browser matrix](#graded-browser-matrix).

### Analysis of client data <a name="client-data" />

Analysing client user data, through analytics software, we can create an interactive experience suited to specific user requirements. e.g. if the user base primarily uses modern browsers the designed experience can target advanced browser features.

A cut off point for support is recommended at &lt; 2%. [[2](#note-2)]

### Client requirements <a name="client-requirements" />

We understand that the client may have specific requirements for interactive development. e.g. support of a specific browser that may otherwise be unsupported or the use of a particular technology that have implications for the development process. [[3](#note-3)]

## Graded browser support

### Grade A support <a name="grade-a-support" />

Pages rendered in browsers with Grade A support will meet the functional specification, user interface specification and creative design. If a level one browser is incapable of meeting any of these criteria either the particular criteria will need to be altered to match the browser capability or the browser should be reduced to Grade B support.

### Grade B support <a name="grade-b-support" />

Pages rendered in browsers with Grade B support will meet the functional specification. The majority of the user interface specification and creative design will be met dependent on the capability of the browser, if either criteria is a barrier to meeting the functional specification, the functional specification will take priority.

### Grade C support <a name="grade-c-support" />

Pages rendered in browsers with Grade C support will meet the functional specification. The user interface specification and creative design will be used as guidance, meeting the functional specification and making content available takes priority.

### Unsupported

Unsupported browsers will not be reviewed during development or quality assurance.

## Graded browser matrix

The graded browser matrix details browsers, operating systems and their support level during the development process.

| Browser             |  Windows XP           |  Windows 7           | OS 10.7              | iOS 5.x              | Android 2.x          |
|---------------------|-----------------------|----------------------|----------------------|----------------------|----------------------| 
| Firefox 13.x        | [Grade A support][a]  | [Grade A support][a] | [Grade A support][a] |                      |                      |
| Chrome 20.x         | [Grade A support][a]  | [Grade A support][a] | [Grade A support][a] |                      |                      |
| Safari 5.1.x          |                       |                    | [Grade A support][a] |                      |                      |
| Internet Explorer 9 |                       | [Grade A support][a] |                      |                      |                      |
| Internet Explorer 8 | [Grade A support][a]  | [Grade A support][a] |                      |                      |                      |
| iOS Safari          |                       |                      |                      | [Grade B support][b] |                      |
| Android webkit      |                       |                      |                      |                      | [Grade B support][b] |

[a]: #grade-a-support
[b]: #grade-b-support
[c]: #grade-c-support

Although browser implementation variations are negligible between operating system, they are included as guidance for [quality assurance](#quality-assurance). [[3](#note-3)]

## Feature definitions

### Operating system

Testing of particular operating systems will be against the latest non-beta minor version. [[4](#note-4)]

### Operating system rendered elements

HTML form elements are commonly rendered by the operating system rather than the browser for security reasons. As they are rendered by the operating system, CSS does not have full control of the element's styling. HTML elements rendered by the operating system are expected to deviate from the design due to this limitation.

CSS styling is the preferred method to allow the HTML element to benefit for operating system integration. If HTML elements rendered by the operating system are required to exactly match the design a JavaScript replacement of the element may be developed. [[5](#note-5)]

### Browser version

Browser testing will be against the latest non-beta minor version. The version supported will be the version current [quality assurance](#quality-assurance). [[6](#note-6)]

### Internet Explorer Compatibility Mode

Internet Explorer Compatibility Mode will not be specifically tested and development will force Internet Explorer to render in the latest browser version of the tested browser. [[7](#note-7)]

### Pre-release browsers

Pre-release browsers may be developed for at the request of the client but development is only valid for the agreed version of pre-release browser. Although an indicator of support for the released browser version it is not a guarantee of support. Further development and quality assurance testing will be required. [[8](#note-8)]

### JavaScript support

A non-JavaScript experience will be supported and tested as part of the development. The specific experience is reliant on exploration by information architecture and visual design, if no exploration is made available to development, the non-JavaScript experience will gracefully degrade to the functional specification. [[9](#note-9)]

### Flash version

Testing of Flash will be against the latest non-beta minor version. [[10](#note-10)]

### Silverlight version

Testing of Silverlight will be against the latest non-beta minor version. [[11](#note-11)]

## Quality management

Managing project quality is important part of our development approach. We achieve this through [quality control](#quality-control) using recognised standards, best practice and [quality assurance](#quality-assurance) through dedicated testing.

### Quality control

We apply quality gates to our development by both automated and manually validating against international standards and best practice. These standards include:

* [HTML validation](http://validator.w3.org/)
* [CSS coding conventions](http://jigsaw.w3.org/css-validator/)
* [JavaScript coding conventions](http://www.jshint.com/)
* [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG/)

Automated testing in achieved through continuous integration during the development. Manual testing is achieved by peer review between developers during development and as a formal process with senior developers. Manual testing ensures that the spirit of the standards are met.

### Quality assurance

Quality assurance is achieved through the visual design and quality assurance teams. [[12](#note-12)]

Testing is undertaken on each supported browser version with a native install of the specified operating system.

Since the same browser is expected to provide the same experience between equivalent operating systems to streamline the testing process, testing is split in to primary and secondary phases.

Primary testing is engaged in during development to ensure [Grade A support][a] is achieved for that browser on an equivalent operating system.

| Browser             |  Operating system |
|-------------------- |------------------ |
| Firefox 13.x        |  Windows 7        |
| Firefox 13.x        |  OS 10.7          |
| Chrome 20.x         |  Windows 7        |
| Chrome 20.x         |  OS 10.7          |
| Safari 5.1.x          |  OS 10.7          |
| Internet Explorer 9 |  Windows 7        |
| Internet Explorer 8 |  Windows XP       |

After primary testing has met it's success criteria, secondary testing is engaged for equivalent operating systems at [Grade A support][a] plus [Grade B support][b] and [Grade C support][c] supported browsers.

| Browser             |  Operating system |
|-------------------- |------------------ |
| Firefox 13.x        |  Windows XP       |
| Chrome 20.x         |  Windows XP       |
| Internet Explorer 8 |  Windows 7        |
| iOS Safari          |  iOS 5.x          |
| Android webkit      |  Android 2.x      |

## Support review process

Long term developments require a regular support review to maintain an updated and relevant browser capability.

Browser support should be reviewed at regular intervals. Interval length is dependent on project life cycle but should be agreed to as part of the support review process.

Changes to support will require an estimation of effort to manage implementation.

### Browser review

Supported browsers will be reviewed based on current site data and expected browser usage at the end of the project.

### JavaScript review

JavaScript library, framework or plugin version will also be assessed and updated during the review process. It is recommended versions remain current for performance and security.

## Notes

Notes are for information only and should be removed.

1. This section is for information only and should be removed. <a name="note-1" />  
2. Specific requirements should be agreed to and documented before development begins. <a name="note-2" />  
3. Browsers and operating systems not outlined in the matrix may be included by agreement with the client. <a name="note-3" />  
4. If a particular operating system or version is required it should be agreed to and documented before development begins. <a name="note-4" />
5. This should be agreed to with the client and visual design then documented before development begins. <a name="note-5" />
6. If a specific version is requested it should be agreed to and documented before development begins. <a name="note-6" />
7. A change to this policy will need to be specifically requested by the client. <a name="note-7" />
8. Pre-release version to be agreed to and documented before development begins. <a name="note-8" />
9. If a non-JavaScript experience is unsupported this should be agreed to and documented before development begins. <a name="note-9" />
10. If required, version to be agreed to and documented before development begins. If there is no Flash development as part of the project then Flash should be declared as unsupported. <a name="note-10" />
11. If required, version to be agreed to and documented before development begins. If there is no Silverlight development as part of the project then Silverlight should be declared as unsupported. <a name="note-11" />
12. A dedicated quality assurance team should be provided to review implementation. The visual design team responsible for the design should provide secondary testing. <a name="note-12" />