# Alfred Melon Youtube

Enjoy Melon chart music in Youtube playlist.
Hope you have Youtube RED :)

Alfred Workflow that uses [melon-chart-api][melon-chart-api] module to fetch [Melon Weekly][melon-weekly] music chart, then populates a new playlist on your [Youtube][youtube] account.

![Demo overview][demo-overview]

## Installation

This Alfred Workflow makes good use of [Alfy][alfy].

```bash
npm install -g alfred-melon-youtube
```

## Usage

Commands available:

  * `melyou` - create or delete a playlist
  * `melyou-auth` - get this workflow authenticated with your Youtube account via [OAuth2][oauth2]

Please get authenticated first with `melyou-auth` command.

The authentication step requires you to copy a code from Google and provide it to this workflow.

![Demo authentication][demo-auth]

Once authenticated, the workflow is able to create/delete a playlist.

![Demo playlist][demo-playlist]


## Miscellaneous

Notes on playlist actions:

  * A playlist with 50 songs takes arounc 25 seconds to complete. This is due the fact that API requests are limited to 2 requests per second.
  * Added songs might not be from an official Youtube channel as the code picks the first result from the search.
  * Do not expect any notification from the actions - perhaps something to add in the future.

Removing the permission:

  * If you wish to remove the permission you've granted to this workflow,
head over to [Google account][google-account] and simply remove the permission.

Modules used:

  * [Alfy][alfy]
  * [melon-chart-api][melon-chart-api]
  * [google-apis-nodejs-client][google-apis]
  * [jest][jest]


[melon-chart-api]: https://github.com/hyunchel/alfred-melon-chart
[melon-weekly]: http://www.melon.com/chart/week/index.htm
[youtube]: https:///youtube.com
[alfy]: https://github.com/sindresorhus/alfy
[google-apis]: https://github.com/google/google-api-nodejs-client
[jest]: https://github.com/facebook/jest
[oauth2]: https://developers.google.com/identity/protocols/OAuth2
[google-account]: https://myaccount.google.com/permissions
[demo-overview]: https://raw.githubusercontent.com/hyunchel/alfred-melon-youtube/master/demos/demo-overview.gif
[demo-auth]: https://raw.githubusercontent.com/hyunchel/alfred-melon-youtube/master/demos/demo-auth.gif
[demo-playlist]: https://raw.githubusercontent.com/hyunchel/alfred-melon-youtube/master/demos/demo-playlist.gif