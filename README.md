# Rafflist
## 🚀 Quick start

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd raffle-system/
    netlify dev
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8888`!

## 🧐 Who's Entered?

Generate a list of entries from the live Stripe database with the following command (while `netlify dev` is running):

```shell
curl localhost:8888/.netlify/functions/emailEntries
```

The CSV will be emailed to Ben. Note that this won't work on the production URL, as the script will time out.