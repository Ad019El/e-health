import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import OrdonanceItem from "../../components/OrdonanceItem";
import { base64ToArrayBuffer, getUserType } from "../Auth";

const drugs = [
  "ABAVIR OS / 20 MG/ML",
  "ABAVIR / 300 MG",
  "CLOTINAB / 2MG/ML ( 10MG/5ML)",
  "ZYTIGA / 250MG",
  "ABIRATERONE UPC / 250MG",
  "ABIRON / 250MG",
  "GLYACARB / 50MG",
  "LARIMEL / 50MG",
  "GLUCONOVA / 50MG",
  "GLUCONOVA / 100MG",
  "GLUCAR / 50MG",
  "GLUCAR / 100MG",
  "DIACARBOSE / 50MG",
  "CORECT / 50MG",
  "ACARLYSE / 50MG",
  "ARBOSE / 50MG",
  "ACROBAY / 50MG",
  "GLUCOBAY / 100MG",
  "GLYBEK / 100MG",
  "SEBUTOL / 200MG",
  "ACEBUTOLOL IVAL / 200MG",
  "NOVAROL / 4MG",
  "SINTROM / 4MG",
  "API E / 500 MG",
  "LYNOX / 250MG",
  "TANGANIL / 500MG/5ML",
  "TANGANIL / 500MG",
  "FLUIMEX / 200MG",
  "RHINOFLUIMUCIL / 100MG/50MG/1,25MG/10ML",
  "ASPIGAL 900 / 500MG/FL. DE PDRE.",
  "ASPEGIC ENFANT / 250MG/SACH.-DOSE",
  "ASPEGIC 500 / 500MG/SACH.-DOSE",
  "CLOVIRAX / 5%",
  "CLOVIRAX / 200MG",
  "ACICLOVIR GL / 200MG",
  "VIRAVIR / 5%",
  "NOVACLOVIR / 5%",
  "NOVACLOVIR / 200MG",
  "CLOVIR / 200MG",
  "ACICLOSINA / 3% (OU 30MG/G)",
  "ACICLOVIR MYLAN / 250MG/FL. DE PDRE.",
  "ASPIRINE CARDIO / 100MG",
  "ASPEC / 100MG",
  "ASPRO ACCEL / 500MG/50MG",
  "ASPIRINE UPSA VITAMINE C TAMPONNEE EFFERVESCENTE / 330MG/200MG",
  "ENDRONAX / 70MG",
  "POROSIMAX PLUS / 70MG/5600UI",
  "VITAMINE  C / 500MG",
  "LADOSCORBINE / 500MG",
  "VITAMINE C / 500MG/5ML",
  "VITAMINE C UPSA EFFERVESCENTE / 1G",
  "APISCORBUT / 500MG",
  "APISCORBUT / 1G",
  "LAROSCORBINE / 1G",
  "VELITEN / 200MG / 50MG / 200MG",
  "DACRYOSERUM / 1,8%/1,2%",
  "CIFLODINE / 5MG",
  "FOLIDEN / 5MG",
  "ACIDE FOLIQUE - API / 5MG",
  "HUPFOLIQ / 5MG",
  "FOLACID / 5MG",
  "FONITRA / 5MG",
  "PHYSIOFOL / 5MG",
  "ACFUSID / 2% (2G/100G)",
  "FUCARE / 250MG",
  "FUCITHALMIC / 1%",
  "FUCIMED / 250MG/5ML",
  "FUCIDINE / 250MG",
  "FUCIDINE / 2%",
  "ACFUSID / 2%",
  "EFFUCINE / 2%",
  "MAFEPAIN / 500MG",
  "NAABAK / 4,9G/100ML",
  "RHINAAXIA / 6G/100ML",
  "FLUCIDAL / 3%",
  "NIFLUGEL / 2.5%",
  "NIFLUMENE / 250MG",
  "FLUCIDAL / 250MG",
  "GEMATE GEL / 2.5%",
  "NIFLURIC / 3%",
  "NIFLURIC / 2.5%",
  "INFLAMINE / 250MG",
  "RISONATE / 35MG",
  "OSTONEL ONCE A WEEK / 35MG",
  "OSTEOS / 30MG",
  "OSTEOS / 5MG",
  "OSTEOS / 35MG",
  "TIALYZ / 200MG",
  "URSOLVAN / 200MG",
  "SOPVAL / 200MG/5ML** (OU 40MG/ML)",
  "ZOMETA / 0,8MG/ML (4MG/5ML)",
  "ZOLIDRO / 0,8MG/ML (4MG/5ML)",
  "ACIDE ZOLEDRONIQUE HIKMA / 4MG/FLACON",
  "ACLASTA / 5MG/100ML",
  "ZOLTONAR / 5MG/100ML",
  "ZOLDRIA / 4MG/FL. DE PDRE.",
  "ZOLENAT / 4MG/FL. DE CONC.",
  "ZOBONE / 4MG/FL. DE LYOPH.",
  "OLICLINOMEL N4- 550E / 5,5%/20%/10%",
  "OLICLINOMEL N7-1000 E / 10%/40%/20%",
  "HUMIRA / 40MG/0,8ML",
  "DIFFERINE / 0.1%",
  "DIFFERINE / 0.1%",
  "ADAPALENE NOVAGENERICS / 0.1%",
  "ADAPALENE NOVAGENERICS / 0.1%",
  "ATEPADENE / 30MG",
  "ATP NOVAGENERICS / 30MG",
  "ADRENALINE RAZES SANS SULFITE / 1MG/ML",
  "DRINAL / 1MG/ML",
  "NORADRENALINE RAZES / 8MG/4ML",
  "GIOTRIF / 20 MG",
  "GIOTRIF / 30 MG",
  "GIOTRIF / 40 MG",
  "GIOTRIF / 50 MG",
  "EYLEA / 40 MG/ML",
  "ZALTRAP / 25MG/ML",
  "REPLAGAL / 1 MG/ML",
  "FABRAZYME / 35MG/FL. DE PDRE.",
  "Nétupitant / palonosétron exprimé  en palonosétron / 300 MG / 0,5 MG",
  "VERTEN / 400 MG",
  "OXYZOL / 400MG",
  "ALBUREL / 20% (20G/100ML)",
  "HUMAN ALBUMIN BAXTER / 20% (OU 0,2G/ML)",
  "ALBUMINE HUMAINE 20% BIOTEST / 20%",
  "VIALEBEX / 200MG/ML ( 20%)",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL CHIRURGICAL 90° / 90°",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL CHIRURGICAL 70° / 70°",
  "ALCOOL DENATURE RPP / 90°",
  "DROMAX / 70MG",
  "POROSIMAX / 70MG",
  "OSPORIX / 70MG",
  "FOSACARE / 70MG",
  "OSTOMAX / 70MG",
  "FOLENAT / 70MG",
  "UN-ALFA / 1µG",
  "UN-ALFA / 0,25 µG",
  "SUPRA CALCI / 1µG",
  "SUPRA CALCI / 0,25µG",
  "FRAXAL / 5MG",
  "PROSTAX LP / 10MG",
  "XATRAL LP / 5MG",
  "FRAXAL / 10MG",
  "GASTRIUM / 50MG/26,7MG/ML",
  "NOBAC / 500 MG/267 MG/160 MG",
  "GATIMOX AROME FENOUIL / 500MG/267MG",
  "MYOZYME / 50 MG/FL APRES RECONSTITUTION 5MG/ML D'ALGLUCOSIDASE ALFA ,APRES LA DILUTION LA CONCENTRATION VARIE DE 0,5 à 4MG/ML",
  "NO URIC 100 / 100MG",
  "NO URIC 300 / 300MG",
  "ZANURIC 100 / 100MG",
  "ZANURIC / 300MG",
  "ZYLORIC / 100MG",
  "NADLORIC / 100MG",
  "LAMYLASE / 20 000 U CEIP/100ML",
  "MEGAMYLASE / 3000 U CEIP",
  "MAXILASE / 20 000 U CEIP/100ML",
  "EDEX / 10µG/ML",
  "EDEX / 20µG/ML",
  "METEOSPASMYL / 60MG/300MG",
  "MUCOREX / 0.30%",
  "TOUXOL / 0,3%**",
  "AMBOLAR / 0.3%",
  "AMBRODAL / 0.3%",
  "FLUXOL / 0.3%",
  "BROXOL / 0.30%",
  "GASTROGRAFINE / I =370MG/ML (10G/66G/100ML)",
  "LIKACIN / 125MG/ML (250MG/2ML)",
  "AMURETIC / 5MG/50MG",
  "TRIAXONE / 200MG",
  "CORDARONE / 200MG",
  "CORDARONE / 50MG/ML (150MG/3ML)",
  "AMIODARONE CLORIDRATO BIOINDUSTRIA L.I.M / 50MG/ML (150MG/3ML)",
  "AMIODARONE HUP / 200MG",
  "MISULAR / 200 MG",
  "AMISULPRIDE LDM / 200MG",
  "SUPRIMIDE / 200MG",
  "SUPRIMIDE / 400MG",
  "SOLIAN / 200MG",
  "SOLIAN / 400MG",
  "AMISULPRIDE BEKER / 200MG",
  "AMISULPRIDE BEKER / 400MG",
  "DEPRESTAT LP / 25MG",
  "ATRYLINE / 25MG",
  "ATRYLINE / 50MG",
  "ATRYLINE / 4% (40MG/ML)",
  "ISOPTYL / 4% (40MG/ML)",
  "AMITRIPTYLINE KPMA / 4% (40MG/ML)",
  "ANXIOL / 4% (40MG/ML)",
  "AMITRIPTYLINE / 4% (40MG/ML)",
  "MITRIL / 25MG",
  "MITRIL / 50MG",
  "MITRIL / 4% (40MG/ML)",
  "GEROXYL / 4% (40MG/ML)",
  "LAROXYLINE / 25MG",
  "LAROXYLINE / 50MG",
  "AMATRILINE / 4% (40MG/ML)",
  "UNISIA / 5MG/8MG",
  "AMLODIPAL / 5MG",
  "LOWVASC / 5MG",
  "AMLIBON / 10MG",
  "TENSODIPINE / 5MG",
  "TENSODIPINE / 10MG",
  "AMLODAL / 5MG",
  "AMLODIPINE LDM / 5MG",
  "AMLODIPINE LDM / 10MG",
  "AMLODAL / 10MG",
  "AMLOMED / 5MG",
  "AMLODIPINE BEKER / 5MG",
  "AMLODIPINE BEKER / 10MG",
  "AMLODIPINE MM / 5MG",
  "TORVAPINE / 5MG/10MG",
  "TORVAPINE / 10MG/10MG",
  "EXBITAN / 5MG/80MG",
  "EXSART / 5MG/80MG",
  "AMLOVAL / 5MG/80MG",
  "BIOFORGE / 5MG/80MG",
  "AMLODIPINE+VALSARTAN LDM / 5MG/80MG",
  "EXVAL / 5MG/80MG",
  "EXFORMEDIC / 5MG/80MG",
  "DARTIX / 5MG/80MG",
  "VESTAMOL / 5MG/80MG",
  "EXBITAN / 5MG/160MG",
  "EXSART / 5MG/160MG",
  "AMLOVAL / 5MG/160MG",
  "AMLODIPINE+VALSARTAN LDM / 5MG/160MG",
  "EXVAL / 5MG/160MG",
  "EXFORMEDIC / 5MG/160MG",
  "ANGIOSAR / 5MG/160MG",
  "DARTIX / 5MG/160MG",
  "AMPLID / 5MG/160MG",
  "VESTAMOL / 5MG/160MG",
  "VALAMLO ALEMBIC MAMI / 5MG/160MG",
  "EXFORGE / 5MG/160MG",
  "EXSART / 10MG/160MG",
  "AMLOVAL / 10MG/160MG",
  "AMLODIPINE+VALSARTAN LDM / 10MG/160MG",
  "ANGIOSAR / 10MG/160MG",
  "EXVAL / 10MG/160MG",
  "EXFORMEDIC / 10MG/160MG",
  "DARTIX / 10MG/160MG",
  "AMPLID / 10MG/160MG",
  "VESTAMOL / 10MG/160MG",
  "COVERAM / 5MG/10MG",
  "COVERAM / 5MG/5MG",
  "COVERAM / 10MG/10MG",
  "COVERAM / 10MG/5MG",
  "EXIRB / 5MG/150 MG",
  "EXFORGE / 5MG/80MG",
  "EXFORGE / 10MG/160MG",
  "LOCERYL / 5%",
  "HIMOXYL / 250MG/5ML",
  "AMOXYPEN / 500MG/FL. DE PDRE.",
  "AMOXYPEN / 1G/FL. DE PDRE.",
  "AMOCLAN / 1G/200MG",
  "CLAVODEX DUO / 875MG/125MG",
  "HIMOXYL / 1G/SACHET",
  "AMOXYPEN / 250MG/5ML",
  "AMOXAL / 250MG/5ML",
  "SAIFOXYL / 1G",
  "BIOPAMOX / 250MG/5ML",
  "AMOXICILLINE EG / 125MG/5ML",
  "AMOXICILLINE EG / 250MG/5ML",
  "AMOXIMEX / 250MG/5ML",
  "CLAVODA R 625 / 500MG/125MG",
  "KLAVOX / 500MG/125MG",
  "CLAVODEX / 500MG/125MG",
  "CLAVODEX / 250MG/62,5MG/5ML",
  "PENAMOX / 500MG/5ML",
  "PENAMOX D / 1G",
  "PENAMOX D / 500MG",
  "AMOXYPEN / 500MG",
  "AMOXYPEN / 1G",
  "AMOXAL / 500MG",
  "AMOXAL / 125MG/5ML",
  "AMOXAL / 500MG/5ML",
  "AMOXAL / 1G",
  "BIOPAMOX / 500MG/5ML",
  "AMOXICILLINE EG / 500MG/5ML",
  "AMOXICILLINE EG / 1G",
  "BIOPAMOX / 1G/SACHET",
  "AMOCLAN 8:1 / 100MG/12,5MG/ML",
  "CLAMOXYPEN / 100MG/12,5MG/ML",
  "BIOCLAV / 100MG/12,5MG/ML",
  "BIOCLAV / 500MG/62,5MG",
  "AUGMENTIN ENFANT ET AUGMENTIN NOURRISSON / 100MG/12,5MG/ML",
  "CLAVODEX / 100MG/12,5MG/ML",
  "CLAVODEX / 500MG / 62,5MG",
  "CLAMOCLAV ENFANT ET NOURRISSON / 100MG/12,5MG/ML",
  "AMOCLAN 8:1 / 1G/125MG/SACHET",
  "BIOCLAV 8:1 / 1G/125MG/SACHET",
  "AUGMENTIN ADULTE / 1G/125MG/SACHET",
  "CLAVODEX / 1G/125MG/SACHET",
  "CLAMOCLAV / 1G/125MG/SACHET",
  "AMOCLAN 8:1 / 500MG/62,5MG",
  "AMOCLAN BID / 400MG/57MG/5ML",
  "AMOCLAN BID / 875MG/125MG",
  "BIOCLAV 8:1 / 500MG/62,5MG",
  "CLAVODEX / 500MG/62,5MG",
  "CLAVODEX DUO / 400MG/57MG/5ML",
  "CLAVODAR FORTE 400/57 / 400MG** / 57MG**",
  "CLAVODAR 1G / 875MG*/125MG*",
  "TABUKLAV / 500MG/100MG",
  "FUNGIZONE / 50MG",
  "FUNGIZONE / 10% (10G/100ML)",
  "AMPILINE / 1G/FL. DE PDRE.",
  "AMPAL / 125MG/5ML",
  "AMPAL / 250MG/5ML",
  "AMPAL / 500MG",
  "DOLODENT / 0,75G/100G",
  "ANASTROZOLE CINFA / 1MG",
  "ARIMIDEX / 1MG",
  "ANASTRODEX / 1MG",
  "GERDOL / 1MG",
  "OPHTAZOLIN / 5MG/0,25MG/ML",
  "GLUCANTIME / 1,5G /5ML",
  "ELIQUIS / 2,5 MG",
  "BIOPEXA / 5MG",
  "ARGINOR / 1G/5ML",
  "ARGINOR ENFANT / 0,5G/5ML",
  "SARGENOR / 1G/5ML",
  "SARGENOR ENFANT / 0,5G/5ML",
  "ARGINOR + C / 1,5G/0,5G/5ML",
  "SARGENOR VITAMINE C / 1,5G/0,5G/5ML",
  "ARINIA / 10MG",
  "ARINIA / 15MG",
  "ABILIZOLE / 1MG/ML",
  "ZOLIFY / 10MG",
  "ZOLIFY / 15MG",
  "ZOLIFY / 20MG",
  "ARIPIPRAZOLE LDM / 10MG",
  "ARIPIPRAZOLE LDM / 15MG",
  "ABILIZOLE / 10MG",
  "ABILIZOLE / 15MG",
  "ABILIZOLE / 10 MG",
  "ABILIZOLE / 15 MG",
  "ABILIFY / 10MG",
  "ABDIFLY / 10MG",
  "ABDIFLY / 15MG",
  "ARIPIPRAZOLE BEKER / 10MG",
  "ARIPIPRAZOLE BEKER / 15MG",
  "ARIPIPRAZOLE BEKER / 20MG",
  "ABILIFY / 15MG",
  "FALCI CARE / 60 MG",
  "TONIC + C / 60MG / 250MG / 100MG / 100MG /100ML",
  "TONI C 1000 / 1G/250MG/100MG/100MG",
  "SARGENINE / 1G",
  "MEGAMAG / 400MG",
  "DAGHTAN 100 / 100MG",
  "TENORMED / 100MG",
  "DAGHTAN 50 / 50MG",
  "STRATTERA / 10MG** (ATOMOXETINE HYDROCHLORIDE 11,43MG)",
  "STRATTERA / 25MG** (ATOMOXETINE HYDROCHLORIDE 28,57MG)",
  "STRATTERA / 60MG** (ATOMOXETINE HYDROCHLORIDE 68,56MG)",
  "TORVAST / 40MG",
  "TORVAST / 80MG",
  "TEOLAR / 20MG",
  "TEOLAR / 40MG",
  "TEOLAR / 80MG",
  "TAHOR / 20MG",
  "TAHOR / 40MG",
  "LIPODAR 20 / 20MG",
  "NOVATHOR / 20MG",
  "NOVATHOR / 40MG",
  "NOVATHOR / 80MG",
  "TARDEN / 20MG",
  "TARDEN / 40MG",
  "LIPOVAST 20 / 20MG",
  "LIPOVAST / 40MG",
  "ATORVASTATINE IVAL / 20MG",
  "VASKOL 20 / 20MG",
  "LIPICARE / 20MG",
  "LIPICARE / 40MG",
  "LIPICARE / 80MG",
  "ATORVASTATINE LDM / 20MG",
  "ATORVASTATINE LDM / 40MG",
  "ATORVASTATINE LDM / 80MG",
  "ATOR / 80MG",
  "ATOR 40MG / 40MG",
  "AROVAN / 20MG",
  "AROVAN / 40MG",
  "AROVAN / 80MG",
  "TORVASTATINE / 20MG",
  "TORVASTATINE / 40MG",
  "TORVASTATINE / 80MG",
  "ATORIN 20MG / 20MG",
  "ATORIN 40MG / 40MG",
  "ATORIN 80MG / 80MG",
  "LIPOSTATINE / 20MG",
  "ATORVASTATINE GEBER / 20MG",
  "LIPONIL 20 / 20MG",
  "LIPONIL 40 / 40MG",
  "ATORVASTATINE IVAL / 40MG",
  "TEOLAR / 10MG",
  "LIPODAR 10 / 10MG",
  "NOVATHOR / 10MG",
  "TARDEN / 10MG",
  "LIPOVAST 10 / 10MG",
  "ATORVASTATINE IVAL / 10MG",
  "VASKOL 10 / 10MG",
  "LIPICARE / 10MG",
  "ATORVASTATINE LDM / 10MG",
  "ATOR 10MG / 10MG",
  "AROVAN / 10MG",
  "TORVASTATINE / 10MG",
  "ATORIN 10MG / 10MG",
  "LIPOSTATINE / 10MG",
  "ATORVASTATINE MM /  10MG",
  "ATORVASTATINE GEBER / 10MG",
  "ATORVASTATINE GEBER / 40MG",
  "LIPONIL / 10MG",
  "TRACTOCILE / 7,5MG/ML (6,75MG/0,9ML)",
  "TRACTOCILE / 7,5MG/ML (37,5MG/5ML)",
  "ATACURE / 10MG/ML (50MG/5ML)",
  "APITROPIN / 0.5%",
  "APITROPIN / 1%",
  "CROPINE / 0.5%",
  "CROPINE / 1%",
  "INLYTA / 1 MG",
  "INLYTA / 5 MG",
  "VIDAZA / 25 MG/ML",
  "WINDUZA / 25 MG/ML ( 100 MG/FL )",
  "AZATHIOPRINE MYLAN / 50MG",
  "IMUREL / 50MG",
  "AZYTER / 15 MG/G",
  "ZOTRIX / 250MG",
  "ZOTRIX / 40MG/ML",
  "ZOMAX / 40MG/ML  (200MG/5ML ET 300MG/7,5ML)",
  "ZOTRIX / 500MG",
  "AZITHRAL / 500MG",
  "ZITHROMAX / 500MG",
  "AZITHROMYCINE NS / 500MG",
  "ZETRON / 250MG",
  "ZETRON / 500MG",
  "AZITHROM HUP / 500MG",
  "AZITHROMYCINE BEKER / 500MG",
  "MYCINAD / 250MG",
  "MYCINAD / 500MG",
  "MYCINAD / 500MG",
  "BACRO / 10MG",
  "LIORESAL / 10MG",
  "BACLON / 10MG",
  "BALSOFUMINE  SIMPLE / ",
  "BALSOFUMINE MENTHOLEE / 1%",
  "BALSOFUMINE MENTHOLEE / 4%",
  "RHUM 'NET / ",
  "VAPORHUM / ",
  "OXEOL / 10MG",
  "SIMULECT / 20MG /FLACON",
  "BECLOJET / 250µG/BOUFFEE",
  "BECLATE 250 / 250µG/BOUFFEE",
  "BECLATE - NASAL / 50µG/BOUFFEE",
  "BECONASE / 50µG/ Dose",
  "CLENIL 250 / 250µG/BOUFFEE",
  "RINOCLENIL 100 / 100µG/DOSE",
  "NASABEC / 100µG/DOSE",
  "NASABEC / 50µG/DOSE",
  "FOSTER /  100µG/6µG",
  "RIBOMUSTIN / 2,5MG/ML (APRES RECONSTITUTION)",
  "BENDAMUSTINE HYDROCHLORIDE ACCORD / 2,5MG/ML (APRES RECONSTITUTION)",
  "BENTERO 100 / 100 MG/FL",
  "HUMEX MAL DE GORGE LIDOCAINE / 0,030G/0,300G/100ML",
  "RETARCILINE / 600 000UI/FL. DE PDRE.",
  "RETARCILINE / 1 200 000UI/FL. DE PDRE.",
  "ASCALOL / 25G/100G",
  "ASCABINE FORTE / 25G/100G",
  "NEO-CODION NOURRISSONS / 74,1MG/30,8MG/32,964MG/CUILLERE A CAFE",
  "GECTAPEN / 1 000 000UI/FL. DE PDRE.",
  "BASDENE / 25MG",
  "SURVANTA / 25 MG/ML",
  "MEVERC / 8MG",
  "BETASERC / 24MG",
  "VERTIGO / 24 MG",
  "VERSEC / 24 MG",
  "MEVERC / 16MG",
  "LECTIL / 16MG",
  "SERC / 8MG",
  "BETAHIST / 24MG",
  "ANATAX / 24MG",
  "ANATAX / 16MG",
  "ANATAX / 8MG",
  "BETADERME / 0.1%",
  "BETABIO / 0,5MG/ML (0,05%)",
  "BETABIO / 2MG",
  "CELETASONE / 0,5MG/ML (0,05%)",
  "CELETASONE / 2MG",
  "BETASTENE / 0,5MG/ML (0,05%)",
  "B-CORTOSONE / 0,5MG/ML (0,05%)",
  "BETSOL / 0.05%",
  "BETACROVIS / 0,5MG/ML (0,05%)",
  "LESTONE / 0,5MG/ML (0,05%)",
  "BETAMETHASONE PHYSIOPHARM / 0,5MG/ML (0,05%)",
  "BETASTENE / 0,5MG/ML (0,05%)",
  "CELESTENE / 2MG",
  "CELESTENE CHRONODOSE / 2,7MG/3MG/AMP.",
  "HELESTENE CHRONODOSE / 2,7MG/3MG/ML",
  "BETAMETHASONE NOVAGENERICS / 0.05%",
  "DIPROSONE / 0.05%",
  "DIPROSTENE / 5MG/2MG/SERINGUE",
  "HUPPROSTENE / 5MG/2MG/1ML",
  "BETASONE / 0.05%",
  "BETASONE / 0.1%",
  "BETAMETHASONE NOVAGENERICS / 0.05%",
  "CELETASONE / 0.05%",
  "BETACYL / 0,05G%/3G%",
  "BETAMETHASONE-ACIDE SALICYLIQUE NOVAGENERICS / 0,05G/3G/100G",
  "BETAMETHASONE NOVAGENERICS / 0.1%",
  "DERMASONE / 0.05%",
  "OPHTAMESONE / 1MG/ML",
  "OPHTAMESONE N / 1MG/5MG/ML",
  "BERTOCIL / ( 5MG/ML) 0,5%",
  "BICALUTAMIDE CINFA / 50MG",
  "CLAMUDEX / 50MG",
  "CASODEX / 50MG",
  "BICADEX / 50MG",
  "HEXASPRAY / 750MG/30G (0,75G/30G)",
  "HEXALYSE / 5MG/5MG/5MG",
  "BILAXTEN / 20MG",
  "GYLAXA / 5MG",
  "PRODOL / 10MG",
  "PRODOL / 5MG",
  "PROMIVOL / 10MG",
  "DIPROLOL / 10MG",
  "DIPROLOL / 5MG",
  "CIRBESA / 10MG",
  "CIRBESA / 5MG",
  "BYZOLEX / 10MG",
  "BIPROTENS / 5MG",
  "DETENPRESS / 10MG",
  "BISOPROLOL BEKER / 10MG",
  "BISOPROLOL BEKER / 5MG",
  "BISOPROLOL MM / 10MG",
  "BISOPROLOL MM / 5MG",
  "RIZOPROL / 10MG",
  "CO BIPROTENS / 5MG/6,25MG",
  "CO BIPROTENS / 10MG/6,25MG",
  "CO-BISOPROLOL BEKER / 10MG/6,25MG",
  "CO-BISOPROLOL BEKER / 5MG/6,25MG",
  "BYZOLEX / 5MG",
  "BLEOMYCINE / 15MG",
  "BLOICIN -S / 15MG (15 UI)",
  "BLEU DE METHYLENE / 1%",
  "BLINCYTO / 35µG/FLACON",
  "VICTRELIS / 200 MG",
  "VELCADE / 3,5MG/FL. DE PDRE. (OU 1MG/ML DE SOL. RECONSTITUEE)",
  "BORTEZOMIB INTAS / 3,5MG/FL. DE PDRE.",
  "BORTERO / 3,5MG/FL.",
  "BOSENTAS / 62,5MG",
  "BOSENTAS / 125MG",
  "PMS-BOSENTAN / 62,5MG",
  "PMS-BOSENTAN / 125MG",
  "ERATAN / 62,5MG",
  "ERATAN / 125MG",
  "TRACLEER / 62,5MG",
  "TRACLEER / 125MG",
  "ADCETRIS / 5 MG / ML",
  "AZOPT / 10MG/ML",
  "BROMAZEPAM IVAL / 6MG",
  "BROMAZEPAM / 6MG",
  "ANXYPAM / 6MG",
  "KIETYL / 6MG",
  "LEXOPAM / 6MG",
  "BROMAZEPAM PHYSIOPHARM / 6MG",
  "ISOLVON / 10MG/5ML",
  "PARLODEL / 2,5MG",
  "CALCIBRO / 2G",
  "BUDECORT- 200 / 200µG/DOSE",
  "PULMICORT / 0,5MG/2ML",
  "PULMICORT TURBUHALER / 200µG/DOSE",
  "RHINOCORT / 64µG/DOSE",
  "PULMICORT / 1MG/ 2ML",
  "SYMBICORT TURBUHALER / 100µG/6µG/DOSE",
  "SYMBICORT TURBUHALER / 200µG/6µG/DOSE",
  "SYMBICORT TURBUHALER / 400µG/12µG/DOSE",
  "BUDEK PLUS / 400µG/12µG/DOSE",
  "FORMONIDE / 100µG/6µG/DOSE**",
  "FORMONIDE / 200µG/6µG/DOSE**",
  "FORACORT / 100µG/6µG/GLE.**",
  "FORACORT / 200µG/6µG/GLE.**",
  "FORACORT HFA 100 / 100µG/6µG/DOSE",
  "FORACORT HFA 200 / 200µG/6µG/DOSE",
  "BUDIAIR 200µG ET BUDIAIR 200µG JET / 200µG/DOSE",
  "BUPIVACAINE RAZES / 0,5 %                                     ( 20MG/4ML)",
  "BUPRINAL / 0,3MG/ML",
  "NARUFENE / 600MG",
  "BUSILVEX / 6MG/ML (60MG/10ML)",
  "SINECOD 0,15% / 1,5MG/ML",
  "JEVTANA / 40MG/ML (60MG/1,5ML)",
  "BACAZIRED / 40MG/ML (60MG/1,5ML)",
  "DOSTINEX / 0,5MG",
  "DOSTINOVA / 0,5MG",
  "CABERNEX / 0,5MG",
  "DEDROGYL / 5µG/GTTE.",
  "DAIVOBET / 50µG/0,5MG/G",
  "PSORASONE / 50µG/0,5MG/G",
  "CALCIPOTRIOL novagenerics / 50 UG/G",
  "PSORANEX / 50 UG/G",
  "CALCO / 100UI/ML",
  "CALCIBRONAT / 2G",
  "CALCIUM NOVAGENERICS / 500MG",
  "RENNIE DEFLATINE / 680MG/80MG/25MG",
  "OSSECAL / 500MG",
  "CALCIDOSE / 500MG/SACHET DOSE (1250MG/SACHET DOSE DE CARBONATE DE CALCIUM )",
  "CALCIUM API / 500MG",
  "CALCIUM HYSA 500 / 500MG DE CALCIUM (1250MG DE CALCIUM CARBONATE)",
  "KALCITAB / 500MG",
  "CHLORURE DE CALCIUM RAZES 10% / 1G/10ML",
  "CALCIAL / 67,5MG/5ML (0,5G/5ML EN CALCIUM PIDOLATE)",
  "CALCIFOR / 67,5MG/5ML EN CALCIUM ELEMENT** (10%  EN CALCIUM PIDOLATE)",
  "INFASURF / 35 MG/ML",
  "ATACAND / 16MG",
  "HYTACAND / 16MG**/12,5MG",
  "HYTACAND / 8MG**/ 12,5MG",
  "CANDERAX / 8MG",
  "CANDERAX / 16MG",
  "CARDAXEL BGL / 8MG",
  "TENSIONORM / 8MG",
  "CARDAXEL BGL / 16MG",
  "TENSIONORM / 16MG",
  "ATACAND / 8MG",
  "TENSIONORM / 4MG",
  "SARCAND / 4MG",
  "SARCAND / 8MG",
  "SARCAND / 16MG",
  "ATABEK / 8MG",
  "ATABEK / 16MG",
  "CANDERAX PLUS / 8MG/12,5MG",
  "CANDERAX PLUS / 16MG/12,5MG",
  "BLOPRESS 8 PLUS / 8MG / 12,5MG",
  "BLOPRESS 16 PLUS / 16MG / 12,5MG",
  "CARDAXEL PLUS / 16MG / 12,5MG",
  "CARDAXEL PLUS / 8MG/12,5MG",
  "CO SARCAND / 8MG/12,5MG",
  "CO SARCAND / 16MG/12,5MG",
  "CO-ATABEK / 8MG/12,5MG",
  "CO-ATABEK / 16MG/12,5MG",
  "TENSIOPRIL / 25MG",
  "TENSIOPRIL / 50MG",
  "TENSOPREL / 25MG",
  "LOPRIL / 25MG",
  "LOPRIL / 50MG",
  "ECAZIDE / 50MG/25MG",
  "CAPOCARD PLUS / 50MG/25MG",
  "PRIAZIDE / 50MG/25MG",
  "CO-TENSOPREL / 50MG/25MG",
  "CARBATOL / 200MG",
  "TEGRETOL / 200MG",
  "TEGRETOL / 100MG/5ML",
  "TEGRETOL LP / 400MG",
  "AZEPAL / 200MG",
  "TAVER / 200MG",
  "CARBIMOL / 200MG",
  "CARBIMOL LP / 400MG",
  "BIOMAZINE / 200MG",
  "NEUPAX / 200MG",
  "NEUPAX / 20MG/ML",
  "TEGRIDIS / 20MG/ML",
  "ZEPTOL CR 400 / 400MG",
  "CROVIMAZOLE / 5MG",
  "ATHYROZOL / 5MG",
  "GRIPEX TOUX GRASSE / 5%",
  "PECTOSAN EXPECTORAN ENFANT / 2% (OU 2G/100ML)",
  "PECTOSAN EXPECTORANT ADULTE / 5%",
  "RHINOLACTOL / 5%",
  "HUMEX EXPECTORANT ENFANT / 2% (100MG/5ML)",
  "HUMEX EXPECTORANT ADULTE / 5%",
  "GRIPEX TOUX GRASSE / 2%",
  "RHINATHIOL ENFANT / 2%",
  "RHINATHIOL  ADULTE / 5%",
  "RHINATHIOL SANS SUCRE ENFANTS ET NOURRISSONS / 2%",
  "MUCOLYSE ENFANT / 2%",
  "MUCOLYSE AD. / 5%",
  "CARBOLAM / 2%",
  "CARBOLAM / 5%",
  "CARBOFLUID ENFANT / 2%",
  "CARBOFLUIDE ADULTE / 5%",
  "MUCOLAD / 375MG",
  "BIOCARB  ENFANT / 2%",
  "BIOCARB ADULTE / 5%",
  "PULMOFOR ENFANT / 2%",
  "PULMOFOR ADULTES / 5%",
  "RHINOLACTOL ENFANT / 2%",
  "BRONCHOLACTOL ENFANT / 2%",
  "BRONCHOLACTOL ADULTES / 5%",
  "CARBODAL SANS SUCRE / 5%",
  "CARBOMEX / 2%",
  "CARBOMEX / 5%",
  "RHINATHIOL AD SANS SUCRE / 5%",
  "LIPOSIC / 0,2% (OU 2MG/G)",
  "LACRINORM / 0.2%",
  "OSSECAL / 500MG/SACHET",
  "KINADYN CALCIUM / 500MG/SACHET",
  "FERINJECT / 50 MG/ML",
  "KYPROLIS / 60MG/ FL",
  "CONSIUM / 100MG/FL. DE PDRE.",
  "KINADYN MG / 3MG/SACHET",
  "TITANOREINE / 0,3G/0,2G/0,4G",
  "TITANOREINE A LA LIDOCAINE 2% / 2,5G/2G/2G/2G/100G",
  "CARTEOL / 1%",
  "CARTEOL / 2%",
  "CARTEOL LP / 1%",
  "CARTEOL LP / 2%",
  "CARVEDILOL LDM / 6,25MG",
  "CARVEDILOL LDM / 25MG",
  "CANCIDAS / 50MG/FL. DE PDRE.",
  "CANCIDAS / 70MG/FL. DE PDRE.",
  "AFUNDAS-L / 50MG/FL. DE PDRE.",
  "AFUNDAS-L / 70MG/FL. DE PDRE.",
  "CLORAFAL / 500MG",
  "TABICLOR / 125MG/5ML",
  "TABICLOR / 250MG/5ML",
  "TABICLOR / 500MG",
  "CLORACEF FORTE 250 / 250MG/5ML",
  "CLORACEF MR / 500MG",
  "CLORACEF MR / 750MG",
  "DICEF / 250MG/5ML",
  "CEDROX / 1G",
  "CEDROXAL / 1G",
  "LEXIN / 500MG",
  "LEXINAL / 250MG/5ML",
  "CEPHADAR FORTE / 500MG",
  "CEPHADAR / 125MG/5ML",
  "RAMOXIN / 500MG",
  "RAMOXIN / 125MG/5ML",
  "CEPHALEX / 500MG",
  "UNILEXIN / 500MG",
  "KEFORAL / 250MG/5ML",
  "KEFORAL / 500MG**",
  "ANCEFAL / 500MG",
  "ANCEFAL / 1G",
  "LEXINAL / 125MG/5ML",
  "LEXIN / 1G",
  "ANCEFAL / 125MG/5ML",
  "LEXINAL / 500MG",
  "LEXINAL / 1G",
  "KEFALEX / 1G",
  "LEXINAL / 500MG",
  "CEPHALEX / 250MG/5ML",
  "MIDAFLEX / 500MG**",
  "ZEPILEN / 1G/FL. DE PDRE.",
  "CEFAZOL / 200MG/ML (OU 1G/5ML)",
  "NODILOF / 1G/FL. DE PDRE.",
  "CEFAZAL / 1G/FL. DE PDRE.",
  "CEFAZAL / 1G",
  "OMNICEF / 300MG",
  "OMNICEF / 125MG/5ML",
  "OMNIFAL / 300MG",
  "WINEX / 400MG",
  "BETIXIM / 400MG",
  "OROKAL / 400MG",
  "ORAKAL / 100MG/5ML",
  "WINEX / 200MG",
  "OROKEN ENF / 100MG/5ML",
  "OROKEN NOUR / 40MG/5ML",
  "OROKAL / 40MG/5ML",
  "OROKEN / 200MG",
  "OROKAL / 200MG",
  "PERAZ 1000 / 1 000MG/FL. DE PDRE.**",
  "PERAZ 2000 / 2 000MG/FL. DE PDRE.**",
  "TRICEF / 1G/FL. DE PDRE.",
  "CEFOTAL / 1G/FL. DE PDRE.",
  "CEFODEX / 1GR/FLACON",
  "RELOXAL / 40MG/5ML (OU 8MG/ML)**",
  "ZEEFRA / 500MG",
  "CEFTAZIM / 500MG/FL. DE PDRE. (ENFANT ET NOURRISSON)",
  "CEFTAZIM / 1G/FL. DE PDRE. (ADULTE)",
  "CETIZAL /  1G",
  "TIZO 1000 / 1 000MG/FL. DE PDRE.",
  "CEFTRIAXONA HIKMA / 1G/FL. DE PDRE.",
  "CETRIAXONE HUP / 1G/FL. DE PDRE.",
  "ZINETAL / 250MG",
  "ZINETAL / 500MG",
  "DAROXIME / 250MG",
  "ZINNAT / 250MG",
  "ZINNAT / 125MG/5ML",
  "ZINOXIMOR / 250MG",
  "ZINOXIMOR 500 / 500MG",
  "CEFUCARE / 250MG",
  "CEFROZINE / 250MG",
  "CEFROZINE / 500MG",
  "CIREXA / 100MG",
  "CIREXA / 200MG",
  "NOTOREX / 200MG",
  "CELECOX / 100MG",
  "CELEXAL / 200MG",
  "CELEBREX / 100MG",
  "CELEBREX / 200MG",
  "NOVABREX / 100MG",
  "NOVABREX / 200MG",
  "INICOX 100 / 100MG",
  "INICOX 200 / 200MG",
  "COXIBREX / 100MG",
  "COXIBREX / 200MG",
  "CELECOXIB LDM / 100MG",
  "CELECOXIB LDM / 200MG",
  "RUMABREX / 100MG",
  "RUMABREX / 200MG",
  "CELECOBREX HUP / 100MG",
  "CELECOBREX HUP / 200MG",
  "CELECOMEX / 100MG",
  "CELECOMEX / 200MG",
  "CELVEX / 100MG",
  "CELVEX / 200MG",
  "CELECOXIB BEKER / 100MG",
  "CELECOXIB BEKER / 200MG",
  "ARBREX / 100MG",
  "ARBREX / 200MG",
  "MEDIBREX / 100MG",
  "MEDIBREX / 200MG",
  "GRIPEX ALLERGIE / 10MG",
  "CETIRIZINE GL / 10MG/ML",
  "CETIRIZINE PHYSIOPHARM / 10MG/ML",
  "ZYTREX / 10MG",
  "RHITENE / 10MG",
  "RHITENE / 10MG/ML",
  "TRIZ / 10MG/ML",
  "ZETIREC / 10MG/ML",
  "HISTARIZINE / 10MG",
  "ARTIZ / 10MG",
  "ARTIZ / 10MG/ML",
  "ZITRINE / 10MG/ML",
  "ZYRTIRIZINE / 10MG",
  "CETIRIZINE MYLAN / 10MG",
  "CETIRIZINE PHYSIOPHARM / 10MG",
  "NADEC / 10MG",
  "CETROTIDE / 0,25MG/FL. DE PDRE",
  "ERBITUX / 5MG/ML (100MG/20ML - 500MG/100ML)",
  "LYSOPAINE SANS SUCRE / 1,5MG / 20MG",
  "CARBOPHOS / 400MG",
  "EUCARBON / 180MG / 25MG /105MG/50 MG",
  "LEUKERAN / 2 MG",
  "CEBENICOL / 0.4%",
  "ELUDRIL / 0,5ML/0,5G/100ML",
  "HYSADRIL / 0.20%",
  "REMIFENTANIL MYLAN / 2MG/ FLACON",
  "REMIFENTANIL MYLAN / 5MG/FLACON",
  "TRAMADINE / 100MG",
  "RUBIDEX / 2MG/ML ( 10MG/5ML) ET (50MG/25ML)",
  "LARGACTIL / 100MG",
  "DORMAZINE / 4%",
  "DORMAZINE / 100MG",
  "LARGAMED 100 / 100MG",
  "PROMAZ / 100MG",
  "PROMAZ / 4%",
  "LARGACTIL / 4%",
  "CALCIPACK / 10G / 100ML            ( 10%)",
  "CHLORURE DE POTASSIUM AGUETTANT / 10%",
  "KALIPACK / 10% ( 0,1G/ML)",
  "MUTI-BIC 3 MMOL/L POTASIUM / AVANT RECONSTITUTION solution A SOLUTION ACIDE A BASE DE GLUCOSE ET ELECTROLYTES 4,473G/4,410G G/2,033G/22,00 G SOLUTION B SOLUTION ALCALIN A BASE DE BICARBONATE DE SODIUM ET DE CHLORURE DE SODIUM APRES RECONSTITUTION 0,2237G/6,136 G/2,940 G/0,2205 G/0,1017G/1,100",
  "URO 3000CHLORURE DE SODIUM 0,9% / 0.9%",
  "CHLORURE DE SODIUM HYPERTONIQUE SAIDAL / 10%",
  "SOFABIC / 23,53G/69,95G/L",
  "DPCA FORMULE 91 / 5,670G/0,257G/ 0,152G/ 6,537G (3,922g/l de lactate de sodium pur)/ 25G  (correspondant à 22,7g/l ou 2,27% de glucose anhydre) / 1000mL SOIT : 132mmol/l en SODIUM, 1,75mmol/l en CALCIUM, 0,75mmol/l en MAGNESIUM, 35mmol/l en LACTATE , 102mmol/l en chlorure,  126,135mmol/L EN GLUCOSE ANHYDRE",
  "SOFACID A1 / 170,06G/5,49G/9,48G/5,62G/8,85G/L",
  "SOFACID A2 / 210,70G/5,22G/9,00G/3,56G/6,31G/G",
  "REHYDRAX / 2,6G/ 1,5G /2,9G/ 13,5G / SACH. DE 20,5G",
  "MYCOSTER / 8%",
  "MYCODERM / 1% ( 1g/100 g)",
  "MYCOSTER / 1%",
  "SANDIMMUN NEORAL / 25MG",
  "SANDIMMUN NEORAL / 50MG",
  "SANDIMMUN NEORAL / 100MG",
  "SANDIMMUN / 50MG/ML",
  "SANDIMMUN NEORAL / 100MG/ML",
  "IMUSPORIN 25 / 25MG",
  "IMUSPORIN 50 / 50MG",
  "CICLAID / 100MG/ML",
  "ENDOLET / 30MG",
  "ENDOLET / 60MG",
  "ENDOLET / 90MG",
  "MIMPARA / 30MG",
  "MIMPARA / 60MG",
  "MIMPARA / 90MG",
  "INDPRO / 2MG/ML (200MG/100ML)",
  "CIPROFLOXACINE RAZES / 2MG/ML (200MG/100ML) (400MG/200ML)",
  "CIPRODAR / 0,3%**",
  "LOXANAD / 500 MG",
  "CILOXAN / 0.3%",
  "CIPROFLOXAL / 250MG",
  "CIPROFLOXAL / 500MG",
  "CIPRODAR / 500MG",
  "OTOCINE / 2MG/ML (1MG/0,5ML)",
  "FLOCINE / 250MG",
  "CIPROTEK / 250MG",
  "CIPROTEK / 500MG",
  "CIPROFLOXACINE BEKER / 500MG",
  "CIPROFLOXACINE BEKER / 750MG",
  "LOXANAD / 250MG",
  "CIPROTEK / 0.3%",
  "FLOCINE / 500MG",
  "QUINOX / 750MG",
  "QUINOX LP / 1G",
  "SOMAZINA / 125MG/ML  (OU 500MG/4ML )",
  "CITICOLINE GL / 100MG/ML",
  "CITICOLINE ISO / 100MG/ML**",
  "CITICOLINE PHARMAGHREB / 100MG/ML** (OU 10G/100ML)",
  "SOMAZINA / 100MG/ML*(10G/100ML)",
  "SOMAZINA / 250MG/ML** (OU 1000MG/4ML)",
  "SOMACOLINE / 100MG/ML**",
  "CICOLINA / 100MG/ML** (OU 10G/100ML)",
  "CIBETAINE / 2G/5ML",
  "RITOCINE / 500MG",
  "CLARITAL / 500MG",
  "CLARIDAR 500 / 500MG",
  "CLARIDAR 250 / 250MG",
  "CLARIDAR 250 / 250MG/5ML",
  "HUCLAR / 250MG/5ML",
  "CLARIDAR 125 / 125MG/5ML",
  "HUCLAR / 125MG/5ML",
  "ZECLAR / 500MG",
  "ZECLAR / 250MG",
  "ZECLAR 25 / 125MG/5ML",
  "ARICLARE / 500MG",
  "RITOCINE / 250MG",
  "CLINARAM / 150MG",
  "DERMA-T / 1% (10MG/ML)",
  "ACNESTOP / 1% (10MG/ML)",
  "DENACINE / 1% (10MG/ML)",
  "DENACINE EMULGEL / 1% (10MG/ML)",
  "CLOTASOL / 0.05%",
  "CLOBECORT / 0,05%",
  "CLOBECORT / 0.05%",
  "PROCLO JAM / 0.05%",
  "BONEFOS / 800MG",
  "CROVIFENE / 50MG",
  "BIOMID BR / 50MG",
  "CLOMINE / 50MG",
  "CLOMID / 50MG",
  "LOMIFEN / 50MG",
  "CRONIL / 10MG",
  "TRIANIL / 25MG",
  "CLONAPRIME / 10MG",
  "CLONAPRIME / 25MG",
  "CLONAPRIME / 75MG",
  "ANAFRANIL / 25MG/2ML",
  "ANAFRANIL / 10MG",
  "ANAFRANIL / 75MG",
  "CLOFRANIL / 25MG",
  "ANAFRANIL / 25MG",
  "CRONIL / 25MG",
  "CRONIL / 75MG",
  "NOVATRIL / 2MG",
  "RIVOMED / 2MG",
  "CLONA / 2MG",
  "CLONA / 2,5MG/ML",
  "CRONIDINE / 0,15MG",
  "CLOPIDOGREL NOVAGENERICS / 75MG",
  "DAZIL / 75MG",
  "CLODIPRAL / 75MG",
  "CLOPIDOGREL LDM / 75MG",
  "PLAVIX / 300 MG",
  "TRANOXANE / 5MG",
  "TRANOXANE / 10MG",
  "CLORAXENE / 5MG",
  "CLORAXENE / 10MG",
  "TRANXENE / 20MG/2ML",
  "TRANXENE / 50MG /2,5 ML",
  "TRANXENE / 5MG",
  "TRANXENE / 10MG",
  "CLOTERMEX / 1%",
  "MYCOTEN / 1%",
  "LEPONEX / 25MG",
  "LEPONEX / 100MG",
  "TUSSICOD / 0.05%",
  "NEO-CODION / 25MG",
  "EUPHON ADULTE / 0,1G / 0,3G / 100ML",
  "NEO-CODION ADULTE / 0,1722G/100ML (CODEINE BASE  15,4MG/CUILLERE A SOUPE)",
  "NEO-CODION ENFANT / 3,285MG/61MG/5ML",
  "POLERY ADULTE / 11,8MG/443MG/15ML",
  "COLCHICINE OPOCALCIUM / 1MG",
  "COLCHIMED / 1MG",
  "COLCHIMEX / 1MG",
  "VITAMINE D3 B.O.N / 200 000UI/ML",
  "D-THREE / 200 000UI/ML",
  "IDEOS / 400UI/500MG",
  "CALCIUM D3 NOVAGENERICS / 400UI/500MG",
  "OSSE D3 / 400UI/500MG",
  "CALCIUM D3 IVAL / 400UI/500MG",
  "CALCIUM D3 SOPHAL / 400UI/500MG",
  "CALCIDOSE VITAMINE D / 400UI/500MG/SACHET",
  "FIXECAL / 400UI/500MG",
  "FERRO SANOL GYN / 454,13MG équivalent en Fer (2+) 80MG/1MG",
  "FEROMAX / 20MG/ML (100MG/5ML)",
  "VENOFER / 20MG/ML (100MG/5ML)",
  "ENCIFER / 20MG/ML (100MG/5ML)",
  "OCTAPLEX : / 500 UI",
  "FERRUM HAUSMANN GOUTTES / 50MG/ML (200MG/ML)",
  "TRIFER FOL / 100MG/0,35MG",
  "NOVO FER PLUS / 100MG/0,35MG",
  "RAZIFER / 100MG/5ML",
  "VITAM / ",
  "MEGADYN / ",
  "CONCENTRE ACIDE POUR HEMODIALYSE AU BICARBONATE / ",
  "RENACID A13 / ",
  "RENACID A14 RENABIC L14 / ",
];

const options = drugs.map((s) => {
  return { value: s, label: s };
});
const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

var user;
if (JSON.parse(localStorage.getItem("jwt")))
  user = JSON.parse(localStorage.getItem("jwt")).user;

export default function Ordonnance() {
  const [isLoading, setIsloading] = useState(false);
  const [Ordonnance, setOrdonnance] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  let r = state;
  console.log(r);

  const handleAdd = (e) => {
    e.preventDefault();
    let ordonnance = Ordonnance;
    console.log("drugs ", drugs_selected, e.target.duree.value);
    let test = true;
    ordonnance.map((o) => {
      if (o.drug.includes(drugs_selected)) test = false;
    });
    if (drugs_selected && e.target.duree.value && test)
      ordonnance.push({
        drug: drugs_selected,
        posologie: Posologie,
        par: Par,
        voie: Voie,
        duree: e.target.duree.value,
      });
    setIsloading(true);

    //
    setOrdonnance(
      ordonnance.map((o) => {
        return o;
      })
    );
    setIsloading(false);
  };

  useEffect(() => {
    setIsloading(true);
    setOrdonnance(Ordonnance);
    setIsloading(false);
    setIsloading(false);
  }, [isLoading, Ordonnance]);

  let Posologie = "0.25";
  let Par = "Jour";
  let Voie = "Voie Orale";
  let drugs_selected = "";

  const handleSelect = (e) => {
    drugs_selected = e.value;
  };

  const handelPosologie = (e) => {
    Posologie = e.target.value;
  };
  const handelPar = (e) => {
    Par = e.target.value;
  };
  const handelVoie = (e) => {
    Voie = e.target.value;
  };

  const handleCreate = (e) => {
    if (Ordonnance.length <= 0) return;
    console.log("inside", r.r.patient);
    let body = {
      appointment_id: r.r.id,
      medecin: {
        _id: user._id,
        first_name: user.first_name,
        family_name: user.family_name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        speciality: user.speciality,
        address: r.r.patient.address,
        birth_date: user.birth_date,
      },
      patient: r.r.patient,
    };

    let medicaments = [];
    Ordonnance.map((a) => {
      medicaments.push({
        name: a.drug,
        posology: a.posologie,
        par: a.par,
        duration: a.duree,
        voie: a.voie,
      });
    });

    body.medicaments = medicaments;

    e.preventDefault();
    axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/api/medecin/ordonnance`,
        body
      )
      .then((result) => {
        console.log(result);
        // localStorage.setItem("jwt", result.data.token);
        // authenticate(result.data);
        // window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (getUserType() !== "medecin") return <Navigate to="/login" />;

  return (
    <>
      <Navbar
        edit="hidden"
        type="medecin"
        homepath="/medecin"
        // mespatient={"text-darker_grey"}
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full mb-10 justify-center items-start md:text-left">
            <div className="flex flex-row w-full items-start md:text-left">
              <button
                onClick={() => {
                  navigate("/medecin/mes_patient");
                }}
                type="button"
                className="text-darker_grey pt-3 hover:text-grey_light"
              >
                <ArrowLeftIcon className="h-8 w-8" />
              </button>
              <p className="font-medium text-3xl mb-8 text-darker_grey p-2 md:pl-10">
                Ordonnance
              </p>
            </div>
            <div className="justify-center items-center ">
              <div className="relative w-11/12 my-6 mx-auto  ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}

                  {/*body*/}
                  <>
                    <div class="flex justify-center flex-col ">
                      <div class="block rounded-lg shadow-lg bg-white w-full text-center">
                        <div class="p-6">
                          <br></br>

                          <form onSubmit={handleAdd}>
                            <div className="shadow sm:rounded-md ">
                              <div className="grid grid-cols-6 gap-2 pb-2 pt-4">
                                <div className="w-full col-span-2 px-3 mb-6 md:mb-0">
                                  <label
                                    class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                                    for="grid-city"
                                  >
                                    Médicament
                                  </label>
                                  <Select
                                    className="text-left"
                                    name="filters"
                                    placeholder="Filters"
                                    options={options}
                                    onChange={handleSelect}
                                  />
                                </div>

                                <div class="w-full mb-6 mr-2 md:mb-0">
                                  <label
                                    class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                                    for="grid-pas"
                                  >
                                    Posologie
                                  </label>
                                  <div class="relative">
                                    <select
                                      class="block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      id="grid-pas"
                                      onChange={handelPosologie}
                                    >
                                      <option> 0,25</option>
                                      <option> 0,5</option>
                                      <option> 0,75</option>
                                      <option>1 </option>
                                      <option> 2</option>
                                      <option> 3</option>
                                      <option>4</option>
                                      <option> 5</option>
                                      <option> 6</option>
                                      <option>7 </option>
                                      <option> 8</option>
                                      <option> 9</option>
                                      <option>10 </option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                      <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                <div class="w-full mr-2 mb-6 md:mb-0">
                                  <label
                                    class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                                    for="grid-par"
                                  >
                                    Par
                                  </label>
                                  <div class="relative">
                                    <select
                                      class="block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      id="grid-par"
                                      onChange={handelPar}
                                    >
                                      <option> Jour</option>
                                      <option> Semaine</option>
                                      <option> Mois</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                      <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                <div class="w-full mr-2 mb-6 md:mb-0">
                                  <label
                                    class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                                    for="grid-voie"
                                  >
                                    Voie
                                  </label>
                                  <div class="relative">
                                    <select
                                      class="block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      id="grid-voie"
                                      onChange={handelVoie}
                                    >
                                      <option>Voie Orale </option>
                                      <option>Voie Nasale </option>
                                      <option> Voie Sous-cutanée</option>
                                      <option>Voie Intraveineuse </option>
                                      <option> Voie Cutanée</option>
                                      <option> Voie Auriculaire</option>
                                      <option> Voie Oculaire</option>
                                      <option> Voie Rectale</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                      <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                <div class="w-full mr-2 mb-6 md:mb-0">
                                  <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-dure"
                                  >
                                    Durée(jours)
                                  </label>
                                  <input
                                    class="block appearance-none w-full border px-2 border-gray-200 text-gray-700 py-2 pr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-dure"
                                    name="duree"
                                    type="number"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex pt-2 pr-2 justify-end">
                                  <button
                                    type="submit"
                                    className="relative w-auto flex justify-center py-2 px-2 mb-4 font-medium rounded-md transition ease-in duration-200  text-white bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
                                  >
                                    Ajouter ce médicament
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div>
                            {!isLoading ? (
                              <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                                {Ordonnance.map((ord) => {
                                  return (
                                    // <OrdonanceItem
                                    //   drug={ord.drug}
                                    //   posologie={ord.posologie}
                                    //   par={ord.par}
                                    //   voie={ord.voie}
                                    //   duree={ord.duree}
                                    // />
                                    <div>
                                      <div className="shadow  mt-4 sm:rounded-md">
                                        <div className="grid grid-cols-6 gap-2 ">
                                          <p className="self-center text-xs">
                                            {ord.drug}
                                          </p>
                                          <p className="self-center">
                                            {ord.posologie}
                                          </p>
                                          <p className="self-center">
                                            {ord.par}
                                          </p>
                                          <p className="self-center">
                                            {ord.voie}
                                          </p>
                                          <p className="self-center">
                                            {ord.duree}
                                          </p>

                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setIsloading(true);
                                              setOrdonnance(
                                                Ordonnance.filter(
                                                  (o) => o.drug !== ord.drug
                                                )
                                              );
                                              setIsloading(false);
                                            }}
                                            className="relative w-auto flex justify-center mt-4 mr-4 py-2 px-2 mb-4 font-medium rounded-md transition ease-in duration-200  text-white bg-red-500 hover:bg-transparent hover:text-red-500 border-2 border-red-500 focus:outline-none "
                                          >
                                            Retirer
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="flex pt-4 pr-2 justify-center ">
                            <button
                              type="submit"
                              onClick={handleCreate}
                              className="relative w-auto flex justify-center py-2 px-2 mb-4 font-medium rounded-md transition ease-in duration-200  text-white bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
                            >
                              Créer une ordonnance
                            </button>
                          </div>

                          <button
                            className="text-black"
                            onClick={() => {
                              axios
                                .get(`${API}/api/medecin/ordonnance/${r.r.id}`)
                                .then((result) => {
                                  var arrBuffer = base64ToArrayBuffer(
                                    result.data.ordonnance
                                  );
                                  const file = new Blob([arrBuffer], {
                                    type: "application/pdf",
                                  });
                                  const fileURL = URL.createObjectURL(file);
                                  const pdfWindow = window.open();
                                  pdfWindow.location.href = fileURL;
                                })
                                .catch((err) => {
                                  console.log("Error: ", err);
                                });
                            }}
                          >
                            download
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
