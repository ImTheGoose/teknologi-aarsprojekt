# **Teknisk documentation**
Dette document indeholder en oversigt over forskellige emner til teknisk information. Samt hvilket elementer som kan være vigtige til projektet.

## Async loading
Et af vores store problemer under productionen af projektet var hastighed. Jo flere funktioner vi tilføjede jo langsommere loadede appen. 
### Hvorfor async loading?
Problemet med langsom indlæsning kommer af dårlig optimering af større apps. Der findes mange forskellige måder at optimere en app og en af disse er asynkron indlæsning.
> Asynkron indlæsning er når man deler ens program op i blokke, og indlæser de forskellige blokke asynkront fra hinanden.

Når vi har delt vores program op i blokke kan vi bare starte med at indlæse kun hvad brugeren starter med at se. Det betyder at istedet for at vente på hele programmet er indlæst, før brugeren får adgang. Så kan vi bare vente på hvad brugeren først skal se og give dem adgang, imens vi indlæser resten i baggrunden.

### Hvilken forskel har det?
